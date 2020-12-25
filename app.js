(function(){
'use strict';
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;
  list1.items = function(){
    var items = ShoppingListCheckOffService.getToBuyItems();
    if (items.length<=0){
      list1.error="Everything is bought!";
    }else{
      list1.error=null;
      return items;
    };
  }
  list1.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  };
};



AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;
  list2.items = function(){
    var items = ShoppingListCheckOffService.getBoughtItems();
    if (items.length<=0){
      list2.error="Nothing bought yet.";
    }else{
      list2.error=null;
      return items;
    };
  }
}


function ShoppingListCheckOffService() {
  var service = this;
  var itemsToBuy = ["10 Protein Bars","4L Milk","5 bags Oats","Greek Yaourt","1 bag Granola","Salad","Chicken"];
  var itemsBought = [];

  service.boughtItem = function (index) {
    var item = itemsToBuy[index];
    itemsToBuy.splice(index, 1);
    itemsBought.push(item);
  }
  service.getToBuyItems = function () {
    return itemsToBuy;
  };
  service.getBoughtItems = function () {
    return itemsBought;
  };
}

})();
