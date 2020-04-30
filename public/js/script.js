$(document).ready(function ()
{
    /**********     USERS   ***********/

    function addUsersDiv(item, parentDiv)
    {
        var userInfo = document.createElement('tr');

        var nameHeading = document.createElement('td');
        var emailAddress = document.createElement('td');

        $(nameHeading).addClass('user-table-body');
        $(emailAddress).addClass('user-table-body');

        userInfo.append(nameHeading);
        userInfo.append(emailAddress);

        parentDiv.append(userInfo);
    }

    // #showAllUsers POST call
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
    
    // #updateName Post call
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

    /**********     BOOKINGS - ADMIN    ***********/

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

    // #addBooking POST call
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

    /**********     BOOKINGS - USER     ***********/

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

    /**********     SEARCH BOOKING      **********/

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

    // #showSearchBooking results POST call
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

    /**********     VIEW AVAILABLE HOTELS      **********/
    function addAvailableHotelDiv(item, parentDiv)
    {
        var rowDiv = document.createElement('div');
        var nameCol = document.createElement('div');

        //var imgWrapper = document.createElement('p');
        //var img = document.createElement('img');
        var nameHeading = document.createElement('p');
        var address = document.createElement('p');

        $(rowDiv).addClass("row hotels");
        //$(imgCol).addClass("col s2");
        $(nameCol).addClass("col s10");

        //$(img).attr("src", item.img);
        $(nameHeading).text(item.name);
        $(nameHeading).addClass("hotelname");
        $(address).text(item.id);

        //$(imgWrapper).append(img);
        //imgCol.append(imgWrapper);

        nameCol.append(nameHeading);
        nameCol.append(address);

        //rowDiv.append(imgCol);
        rowDiv.append(nameCol);

        parentDiv.append(rowDiv);
    }

});