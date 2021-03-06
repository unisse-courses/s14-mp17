$(document).ready(function ()
{
    /********** USERS ***********/
    function addUsersDiv(item, parentDiv)
    {
        var userInfo = document.createElement('tr');

        var firstnameHeading = document.createElement('td');
        var lastnameHeading = document.createElement('td');
        var emailAddress = document.createElement('td');

        $(firstnameHeading).text(item.firstName);
        $(lastnameHeading).text(item.lastName);
        $(emailAddress).text(item.email);

        userInfo.append(firstnameHeading);
        userInfo.append(lastnameHeading);
        userInfo.append(emailAddress);

        parentDiv.append(userInfo);
    }

    $('#register').click(function() {
        //get data from the form
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var repassword = $('#password').val();

        var newUser = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            repassword: repassword
        };

        $.post('register', newUser, function(data, status) {
            console.log(data);
            if(data.success)
            {
                $('#msg').text(data.message);
                $('#msg').addClass('success');

                $('#firstname').val('');
                $('#lastname').val('');
                $('#email').val('');
                $('#password').val('');
                $('#repassword').val('');
            }
            else
            {
                $('#msg').text(data.message);
                $('#msg').addClass('fail');
            }
        });
    });

    $('#showAllUsers').click(function() {
        $.post('showAllUsers', {}, function(data, status) {
            console.log(data);
            var userListContainer = $('#user-table-body');
            userListContainer.empty();

            data.forEach((item, i) => {
                addUsersDiv(item, userListContainer);
            });
        });
    });

    $('#updateName').click(function() {
        $.post('updateName', {}, function(data, status) {
            console.log(data);
            var userListContainer = $('#user-table-body');
            userListContainer.empty();

            data.forEach((item, i) => {
                addUsersDiv(item, userListContainer);
            });
        });
    });

    /********** BOOKINGS - ADMIN ***********/
    function addBookingsDiv(item, parentDiv)
    {
        var bookingInfo = document.createElement('tr');

        var id = document.createElement('td');
        var hotelName = document.createElement('td');
        var userName = document.createElement('td');
        var checkIn = document.createElement('td');
        var checkOut = document.createElement('td');
        var capacity = document.createElement('td');
        var status = document.createElement('td');
        var price = document.createElement('td');

        $(id).text(item._id);
        $(hotelName).text(item.hotelName);
        $(userName).text(item.userName);
        $(checkIn).text(item.checkIn);
        $(checkOut).text(item.checkOut);
        $(capacity).text(item.capacity);
        $(status).text(item.status);
        $(price).text(item.price);

        bookingInfo.append(id);
        bookingInfo.append(hotelName);
        bookingInfo.append(userName);
        bookingInfo.append(checkIn);
        bookingInfo.append(checkOut);
        bookingInfo.append(capacity);
        bookingInfo.append(status);
        bookingInfo.append(price);

        parentDiv.append(bookingInfo);
    }

    $('#addBooking').click(function() {
        var today = new Date();
        var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);
        
    });

    $('#showAllBookings').click(function() {
        $.post('showAllBookings', {}, function(data, status) {
            console.log(data);
            var bookingListContainer = $('#booking-table-body');
            bookingListContainer.empty();

            data.forEach((item, i) => {
                addBookingsDiv(item, bookingListContainer);
            });
        })
    });

    /********** BOOKINGS - USER ***********/
    function addUserBookingsDiv(item, parentDiv)
    {
        var bookingInfo = document.createElement('tr');

        var id = document.createElement('td');
        var hotelName = document.createElement('td');
        var checkIn = document.createElement('td');
        var checkOut = document.createElement('td');
        var capacity = document.createElement('td');
        var price = document.createElement('td');

        $(id).text(item._id);
        $(hotelName).text(item.hotelName);
        $(checkIn).text(item.checkIn);
        $(checkOut).text(item.checkOut);
        $(capacity).text(item.capacity);
        $(price).text(item.price);

        bookingInfo.append(id);
        bookingInfo.append(hotelName);
        bookingInfo.append(checkIn);
        bookingInfo.append(checkOut);
        bookingInfo.append(capacity);
        bookingInfo.append(price);

        parentDiv.append(bookingInfo);
    }

    $('#showAllUserBookings').click(function() {
        $.post('showAllUserBookings', {}, function(data, status) {
            console.log(data);
            var bookingListContainer = $('#user-booking-table-body');
            bookingListContainer.empty();

            data.forEach((item, i) => {
                addUserBookingsDiv(item, bookingListContainer);
            });
        });
    });

    $('#userSearchBooking').click(function() {
        var hotelName = $('#hotelName');
        $.post('userSearchBooking', {hotelName: hotelName}, function(data, status) {
            console.log(data);
            var bookingListContainer = $('#user-booking-table-body');
            bookingListContainer.empty();

            data.forEach((item, i) => {
                addUserBookingsDiv(item, bookingListContainer);
            });
        });
    });

    

    /********** SEARCH BOOKING **********/
    function addSearchBookingDiv(item, parentDiv)
    {
        var searchBookingInfo = document.createElement('div');

        var searchHotelName = document.createElement('h4');
        var searchStatus = document.createElement('p');
        var searchPrice = document.createElement('p');

        $(searchHotelName).text(hotelName);
        $(searchStatus).text(status);
        $(searchPrice).text(price);

        searchBookingInfo.append(searchHotelName);
        searchBookingInfo.append(searchStatus);
        searchBookingInfo.append(searchPrice);

        parentDiv.append(searchBookingInfo);
    }

    $('#showSearchBooking').click(function() {
        $.post('showSearchResults', {}, function(data, status) {
            console.log(data);
            var searchBookingListContainer = $('#display-search-results');
            searchBookingListContainer.empty();

            data.forEach((item, i) => {
                addSearchBookingDiv(item, searchBookingListContainer);
            });
        });
    });

});