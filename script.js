$(document).ready(function(){

  function addNewItem () {
    var id = $('#items_list li:last-child').data('id');
    if (id === undefined){
      var newId = 1;
    } else{
      var newId = id+1;
    }
    var newItem = $('<li class="item" data-id="'+newId+'"><p class="col-1">Item '+newId+'</p> <p class="col-2"><input class="amount" type="number"> <a class="delete" href="#">X</a></p></li>');
    $(newItem).hide().appendTo('#items_list').fadeIn();
  };

  function currencyFormat (amount) {
    var i = parseFloat(amount);
    if(isNaN(i)) { i = 0.00; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if(s.indexOf('.') < 0) { s += '.00'; }
    if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;
    return s;
  };

  function commaFormat (amount) {
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.',2);
    var d = a[1];
    var i = parseInt(a[0]);
    if(isNaN(i)) { return ''; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while(n.length > 3) {
      var nn = n.substr(n.length-3);
      a.unshift(nn);
      n = n.substr(0,n.length-3);
    }
    if(n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if(d == '00') { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
  };

  function updateTotal() {
    var total = 0;
    $('li .amount').each(function (num) {
      total += Number($(this).val());
    });
    $('.final_result').html(commaFormat(currencyFormat(total.toString())));
  };

  $('#items_list').on('click','a.delete',  function(el){
    el.preventDefault();
    $(this).closest('.item').fadeOut(300, function(){
      $(this).remove();
      updateTotal();
    });
  });

  $('#add_new_item').on('click', 'button', addNewItem);

  $('#items_list').on('keyup', '.amount', updateTotal);
});
