from datetime import datetime
from flask import jsonify

def get_daily_messange_json():
    today = datetime.today()
    day = today.day
    month = today.month

    message = ""

    if month == 8 and day == 15:
        message = "Välkommen till Medieteknik och KTH, nØllan! Efter uppropet idag kommer VRAQUE visa er runt på campus och på eftermiddagen har vi en kort lära känna-PUB så att ni ska få lära känna varandra :)."
    elif month == 8 and day == 16:
        message = "Ikväll är det dags för Välkomstgasquen, er första gasque med oss! Kom ihåg att gå på Gasquevettet kl 13 där VRAQUE kommer lära er hur man gasquear! På morgonen har KTH ett diagnostiskt prov, men oroa er inte! Det är bara för att KTH vill samla statistik."
    elif month == 8 and day == 17:
        message = "Idag börjar vi med intromatte, därefter har vi lunchföreläsning med Sveriges Ingenjörer. Efter lunch är det en kort föreläsning om att hitta balans i studielivet. Sedan har vi vårt Ö&B-event där ni får testa Öl och Bulle: en av Medias mest heliga traditioner. Efteråt är ni välkomna på tillhörande pub!"
    elif month == 8 and day == 18:
        message = "Hej nØllan! Förbered er på en phet torsdag! På morgonen är det intromatte, och efter lunch får ni information av EECS, vår institution, och från THS: KTHs studentkår. På eftermiddagen och kvällen är det Phångarna på Phortet - en riktigt skojsig tävling!"
    elif month == 8 and day == 19:
        message = "Idag börjar vi med Bootcamp med MKM. Under lunchen hålls ett event av Malvina, en förening för tjejer och icke-binära på KTH. Efteråt är det Phemkamp på Philt med StuddyBuddy! Tagga!"
    elif month == 8 and day == 20:
        message = "Hej nØllan! Välkomna till Neverland-gasquen ikväll! Innan gasquen börjar kl 18 kör vi vårt traditionella tårtbak klockan 15."
    elif month == 8 and day == 22:
        message = "Välkomna till vecka 2 av mottagningen och vi rivstartar veckan med sektionens dag! Dagen börjar kl 9 med intromatte, och under lunchen hålls en presentation om sektionens nämnder. Efteråt får ni pröva på hur det är att skriva en tenta på KTH. Slutligen har sektionens dag en mässa med alla sektionens nämnder!"
    elif month == 8 and day == 23:
        message = "Idag är det en lite lugnare dag. På morgonen är det intromatte. Efter lunch är det pluggstuga där ni kan få plugga inför tentan på fredag!"
    elif month == 8 and day == 24:
        message = "Idag är det kårens dag med bland annat ett event med Studienämnden vid lunch. Mellan 13-15 är det även dags för BBR, alltså BrännBollsRace - mycket med skoj utlovas!"
    elif month == 8 and day == 25:
        message = "Dagen börjar med intromatte. Vid lunch är det lunchföreläsning med KTH Sustainability. På eftermiddagen ska vi få lära känna ARR lite bättre på deras alldeles egna bästisevent <3. På kvällen håller rektorn tal!"
    elif month == 8 and day == 26:
        message = "Dagen D! Lycka till på intromattetentan!!! Efter lunch är det bästisevent med INPHO!!!! Sedan åker vi iväg tillsammans på hyrd buss till Stugan för en gasque ute i skogen!"
    elif month == 8 and day == 29:
        message = "Idag börjar era kurser på riktigt! Efter föreläsningarna under dagen så är det Medieklassikern där ni kommer få spela brädspel och tv-spel med varandra. På kvällen är det även quiznight!"
    elif month == 8 and day == 30:
        message = "Ikväll har Medias branschdag och Näringslivsgruppen event!"
    elif month == 8 and day == 31:
        message = "Ikväll är det nØllepubrunda, vilket innebär att ni kommer kunna besöka alla sektionslokaler på Campus och samla märken!"
    elif month == 9 and day == 1:
        message = "Ikväll är det event med Urspårarna/Idrottsnämnden och sedan öppnar äntligen ridån för MetaSpexet!"
    elif month == 9 and day == 2:
        message = "Ikväll är det Amazing Rejs som vi har tillsammans med älskade Data! Väldigt trevligt."
    elif month == 9 and day == 4:
        message = "Välkomna på brunschsittning mellan 11-15!"
    elif month == 9 and day == 6:
        message = "Välkomna på Basecamp från kl 15 innan vi går tillsammans på Bossegasquen som VRAQUE ordnar!"
    elif month == 9 and day == 7:
        message = "Under lunchen finner ni StudyBuddy i META, be there :))!"
    elif month == 9 and day == 8:
        message = "Ikväll är det er första pub som anordnas av MKM vid 17!"
    elif month == 9 and day == 10:
        message = "ÄNTLIGEN ÄR DET NØØØØØØØØØØØØØØØØG!!!!!! Vi möts vid campus vid 14!"
    else:
        message = "Idag är det inga mottagningsaktiviteter planerade! Passa på att ta det lungt!"

    return jsonify({"message": message})
