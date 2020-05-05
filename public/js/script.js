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

    $.post('/adminmanageuser', function(data) {
        var userListContainer = $('#user-table-body');
        userListContainer.empty();

        data.forEach((item, i), function() {
            addUsersDiv(item, userListContainer);
        });
    })

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

});