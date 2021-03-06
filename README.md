# Hotel.Me | Hotel Booking System
# Team Members:
* Mangune, Alexandra Cyrielle L.

### Set up
1. Clone the repository using the terminal or command line `git clone https://github.com/unisse-courses/s14-mp17.git`.
2. Navigate to the folder `s14-mp17`.
3. In `cmd` or Terminal, run `npm install`. (This step will install the dependencies specified in the package.json). Additional packages that is needed for this project include (if they are not included in the installation):
    - `connect-flash`
    - `connect-mongo`
    -  `moment`
    - `nodemon`
    - `express-validator`
    - `express-session`
    - `dotenv`
    - `bcrypt`
    - `cookie-parser`
4. Set up `heroku` package.
5. Run `heroku open` in the `cmd` or Terminal.
6. A browser will open [http://hotel-me-app.herokuapp.com]().

### Credentials
1. Admin
    - username: admin
    - password: pass1234
2. Users
    - John Smith
        - email: johnsmith@email.com
        - password: password
    - Juan Dela Cruz
        - email: juandelacruz@email.com
        - password: password
    - Barbara Doe
        - email: barbaradoe@email.com
        - password: password
    - Maria Clara
        - email: mariaclara@email.com
        - password: password

### Notes
- Dates in the Admin Page that are `December 31, 1999` means that the booking is still available.
Those dates are subjected to change when the user books an available booking.
- The `/` (home page) is public. It cannot be viewed by a user already logged in. A user has a 
separate page to view the same contents of the home page when they choose to `Create Booking` 
found in their dashboards.
