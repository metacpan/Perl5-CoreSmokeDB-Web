# NAME

Perl5-CoreSmokeDB-Web - Frontend SPA in VueJS to
[Perl5-CoreSmokeDB-API](https://github.com/abeltje/Perl5-CoreSmokeDB-API#name)

# DESCRIPTION

This software is the frontend to the API backend written in Perl.

# INSTALLING

Before you start you'll need to install a more modern nodejs/npm than Ubuntu provides on Jammy.
I did the following to get node v18 (check [their github](https://deb.nodesource.com)):
```bash
curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key \
    | gpg --dearmor | sudo tee /etc/apt/keyrings/nodesource.gpg >/dev/null
echo "deb [signed-by=/etc/apt/keyrings/nodesource.pgp] https://deb.nodesource.com/node_18_x jammy main" \
   | tee /etc/apt/sources.list.d/nodesource.list
sudo apt update
sudo apt install nodejs
```

After installing the API service, basically:
```bash
git clone https://github.com/abeltje/Perl5-CoreSmokeDB-Web.git
cd Perl5-CoreSmokeDB-Web
npm install
npm run dev
```

Now point your webbrowser at `http://localhost:5173`

# COPYRIGHT

&copy; MMXXII - Abe Timmerman <abeltje@cpan.org>

# LICENSE

This is free software; you can redistribute it and/or modify it under the same terms as Perl:

- [the "Artistic License"](https://dev.perl.org/licenses/artistic.html)
- [GNU General Public License](https://dev.perl.org/licenses/gpl1.html)

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.
