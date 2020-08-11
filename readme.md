question flow

"co zostało zaplanowane na wczoraj"
(prezentować ostatni task oraz jego estymate)

[czy osiągnięto cel]
- co zostało ukończone wczoraj
- czy udało się osiągnać plan z poprzedniego dnia
- ile realnie zajęło dowiezienie założonych zadań

[nowy cel]
- co dzisiaj w planach
- czy widzisz jakieś problemy, które mogą wystąpić
- ile wg Ciebie zajmie Ci ten task

[motywacja]
czy jest energia do działania -> opcjonalne

[prezentacja info o db]
info w otwartym mongodb na ich serwerze -> dać studentom endpoint, który wyciąga ich dane


db to users
- slack name, real name, email,

db to questions:
- slug, text, optional_answers

db to question-flows:
- slug, description, array of (questions)

db to reports:
- id, userid, array of user(question)


/ rozpocznij question flow / questionflow_id 
POST z user from slack api - wraca report dla usera z wrzuconymi id pytan, datą itp
cache jak w spotkaniach - 1 questionflow moze byc robiony przez 1 usera w tym samym czasie


/ uaktualnij report / report_id
POST z odpowiedzią oraz id pytania w  - wraca swieża wersja report dla usera z wrzuconymi id pytan, datą itp


/ pobierz wszystkie raporty dla usera / user_id
GET
