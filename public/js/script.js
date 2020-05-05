$(document).ready(function() {

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

    function addAdminBookingsDiv(item, parentDiv)
    {
        var bookingInfo = document.createElement('tr');

        var hotelnameHeading = document.createElement('td');
        var usernameHeading = document.createElement('td');
        var checkinHeading = document.createElement('td');
        var checkoutHeading = document.createElement('td');
        var capacityHeading = document.createElement('td');
        var priceHeading = document.createElement('td');

        $(hotelnameHeading).addClass('admin-booking-user-table');
        $(usernameHeading).addClass('admin-booking-user-table');
        $(checkinHeading).addClass('admin-booking-user-table');
        $(checkoutHeading).addClass('admin-booking-user-table');
        $(capacityHeading).addClass('admin-booking-user-table');
        $(priceHeading).addClass('admin-booking-user-table');

        bookingInfo.append(hotelnameHeading);
        bookingInfo.append(usernameHeading);
        bookingInfo.append(checkinHeading);
        bookingInfo.append(checkoutHeading);
        bookingInfo.append(capacityHeading);
        bookingInfo.append(priceHeading);

        parentDiv.append(bookingInfo);
    }

    $('#adminShowAllUsers').click(function() {
        $.post('/adminmanageuser', function(data) {
            var userListContainer = $('#user-table-body');
            userListContainer.empty();
    
            data.forEach((item, i), function() {
                addUsersDiv(item, userListContainer);
            });
        });
    });

    $('#adminSearchUser').click(function() {
        var name = $('#adminSearchUsername').val();

        $.post('/adminmanageuser/search', {name: name}, function(data) {
            var userListContainer = $('#user-table-body');
            userListContainer.empty();

            data.forEach((item, i), function() {
                addUsersDiv(item, userListContainer);
            });
        })
    });

    $('#adminShowAllBookings').click(function() {
        $.post('/adminmanagebooking', function(data) {
            var bookingListContainer = $('#admin-booking-table-body');
            bookingListContainer.empty();
    
            data.forEach((item, i), function() {
                addAdminBookingsDiv(item, bookingListContainer);
            });
        });
    });

    $('#adminSearchBooking').click(function() {
        var name = $('#adminSearchID').val();

        $.post('/adminmanagebooking/search', {name: name}, function(data) {
            var bookingListContainer = $('#admin-booking-table-body');
            bookingListContainer.empty();

            data.forEach((item, i), function() {
                addAdminBookingsDiv(item, bookingListContainer);
            });
        })
    });

});