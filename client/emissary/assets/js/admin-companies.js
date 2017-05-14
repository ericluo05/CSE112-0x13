//var valid = false;

// $('#inForm').validate({ // initialize the plugin
//     rules: {
//         fullName: {
//             required: true,
//         },
//         userEmail: {
//             required: true,
//             email: true
//         }
//     },
//     submitHandler: function (form) { // for demo
//         valid = true;
//         return false; // for demo
//     }
// });

// document.getElementById('inForm').onsubmit = function(e)
// {
//     var newRow,i;
//     e = e || window.event;
//     if (e.preventDefault)
//     {
//         e.preventDefault();
//         e.stopPropagation();
//     }
//     e.returnValue = false;
//     e.cancelBubble = true;
//     if(valid) {
//         newRow = '<tr>';
//         for(i=0;i<this.elements.length;i++)
//         {
//             if (this.elements[i].tagName.toLowerCase() === 'input' && this.elements[i].type === 'text')
//             {
//                 newRow += '<td>'+this.elements[i].value+'</td>';
//             }
//             if (this.elements[i].tagName.toLowerCase() === 'input' && this.elements[i].type === 'email')
//             {
//                 newRow += '<td>'+this.elements[i].value+'</td><td>' +                       
//                             '<a href="#" class="btn btn-danger btn-sm btn-icon icon-left btnSuspend">' +
//                                 '<i class="entypo-cancel"></i>' +
//                                 'Suspend' +
//                             '</a>' +
//                         '</td>';
//             }
//         }
//         document.getElementById('table-2').innerHTML += newRow + '</tr>';
//     }
    
//     return false;
// };


$("#table-2").on('click', '.btnSuspend', function () {
    if($(this).closest('td').children('p').length == 0) {
        $(this).closest('td').append("<p><b>Suspended.</b></p>");
        $(this).closest('td').children('a').text("Unsuspend");
    }
    else {
        $(this).closest('td').children('p').remove();
        $(this).closest('td').children('a').text("Suspend");
    }
});