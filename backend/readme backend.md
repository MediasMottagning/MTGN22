backend-delen av webprojektet för mottagningen 2018.

**Setup (behöver göras en gång per dator)**

Backenden är byggt på Python 3.6, därför måste du ha rätt python-version installerad för att kunna utveckla; du kan kolla vilken python version-som är installerad genom att skriva

```Python```

 i kommandotolken.

För att kunna sätta upp din utvecklingsmiljö behöver du först installera ```virtualenv```-paketet. Detta gör du genom att skriva

```pip install virtualenv```

i kommandotolken.

Sedan måste du skapa filerna som behövs för din virtuella miljö i python versin 3.6. Gå in i backend mappen på terminalen genom "cd backend". Sedan skapar du den virtuella miljön där genom att skriva

```virtualenv venv -p path-till-python36-execution-file-för-din-dator```
```virtualenv -p python3.6 venv```(för mac)

i kommandotolken

För att starta din virtuella miljö måste du skriva

```source venv/bin/activate```

i kommandotolken. Om du använder windows skriver du istället

```venv\Scripts\activate```.

Du måste starta din virtuella miljö för att kunna köra koden.
För att stänga ned den virtuella miljön, skriv

```deactivate``` i kommandotolken.

**Installation av paket**

Första gången du startar din virtuella miljö måste du installera paketen som frack använder sig av; paketen finns listade i ```requirements.txt``` och kan enkelt installeras till din virtuella miljö genom att skriva

```pip install -r requirements.txt```

i kommandotolken.

**Testa din kod**

För att testa frack på en lokal webbserver behöver du först skriva

```export FLASK_APP=start.py```

i kommandotolken. Om du använder windows ska du istället skriva

``` set FLASK_APP=start.py```

(OBS! Se till att din virtuella miljö körs, och att du installerat paketen innan du försöker testa appen!)

Sedan behöver du bara skriva

```python start.py```

i kommandotolken för att starta din lokala testserver, som kommer köras på den address som visas i kommandofönstret.
