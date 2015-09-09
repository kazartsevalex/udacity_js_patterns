var initialCats = [{
    name: "Tom",
    clicks: 0,
    pic: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0",
    nicknames: ['Tom', 'Tommy', 'Hey', 'Little', 'Kitty']
}, {
    name: "Mark",
    clicks: 0,
    pic: "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0",
    nicknames: ["Hey Mark!"]
}, {
    name: "Travis",
    clicks: 0,
    pic: "https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0",
    nicknames: ["I told you he can speak!"]
}, {
    name: "Scott",
    clicks: 0,
    pic: "https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0",
    nicknames: ["Loves mentos"]
}, {
    name: "Matt",
    clicks: 0,
    pic: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0",
    nicknames: ["Who the hell is Matt Skiba?"]
}];

var ViewModel = function() {
    var _this = this;
    this.catList = ko.observableArray([]);
    initialCats.forEach(function(cat) {
        _this.catList.push(new Cat(cat));
    });
    
    this.currentCat = ko.observable(this.catList()[0]);
    this.increaseClicks = function() {
        _this.currentCat().clicks(_this.currentCat().clicks() + 1);
    }    
    
    this.setCurrentCat = function(clickedCat) {
        _this.currentCat(clickedCat);
    }
}

var Cat = function(data) {
    this.name = ko.observable(data.name);
    this.clicks = ko.observable(data.clicks);
    this.pic = ko.observable(data.pic);
    this.nicknames = ko.observableArray(data.nicknames);
    this.title = ko.computed(function() {
        var title;
        var clicksCount = this.clicks();
        if (clicksCount < 10) { 
            title = "Newborn"; 
        } else if (clicksCount < 50) { 
            title = "Infant"; 
        } else if (clicksCount < 100) { 
            title = "Child"; 
        } else if (clicksCount < 200) { 
            title = "Teen"; 
        } else if (clicksCount < 500) { 
            title = "Adult"; 
        } else {
            title = "Old"; 
        }
        
        return title;
    }, this);
}

ko.applyBindings(new ViewModel());