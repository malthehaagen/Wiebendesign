#!/usr/bin/env python3
"""Samler hele beregneren til én fil, der kan lægges op som den er.

    python3 integration/BYG.py

Resultatet er standberegner.html i rodmappen: markup, css, alle otte
js-filer og logoet i ét dokument uden eksterne henvisninger. Det er den
fil, der skal ligge på webhotellet — se HOSTING.md.
"""
import base64
import pathlib

R = pathlib.Path(__file__).resolve().parent.parent
FILER = ['config.js', 'data.js', 'tekst-da.js', 'indhold-da.js',
         'tekst-en.js', 'indhold-en.js', 'pricing.js', 'app.js']

h = (R / 'index.html').read_text(encoding='utf-8')
logo = 'data:image/png;base64,' + base64.b64encode((R / 'assets/logo.png').read_bytes()).decode()

assert h.count('src="assets/logo.png"') == 2, 'logoet står ikke to steder længere'
h = h.replace('src="assets/logo.png"', 'src="%s"' % logo)
h = h.replace('<link rel="stylesheet" href="assets/styles.css">',
              '<style>\n' + (R / 'assets/styles.css').read_text(encoding='utf-8') + '\n</style>')
for f in FILER:
    tag = '<script src="assets/%s"></script>' % f
    assert h.count(tag) == 1, 'fandt ikke præcis én henvisning til ' + f
    h = h.replace(tag, '<script>\n' + (R / 'assets' / f).read_text(encoding='utf-8') + '\n</script>')

assert 'src="assets/' not in h and 'href="assets/' not in h, 'der er stadig en ekstern henvisning'
ud = R / 'standberegner.html'
ud.write_text(h, encoding='utf-8')
print('skrevet %s · %d tegn' % (ud.name, len(h)))
