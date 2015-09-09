"use strict";

(function($) {
    
    var model = {
        data: [{
                id: 0,
                name: "Tom",
                clicks: 0,
                pic: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0"
            }, {
                id: 1,
                name: "Mark",
                clicks: 0,
                pic: "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0"
            }, {
                id: 2,
                name: "Travis",
                clicks: 0,
                pic: "https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0"
            }, {
                id: 3,
                name: "Scott",
                clicks: 0,
                pic: "https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0"
            }, {
                id: 4,
                name: "Matt",
                clicks: 0,
                pic: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0"
            }
        ],
        updateCatInfo: function(newCatInfo) {
            var index = model.data.indexOf(controller.currentCat);
            newCatInfo.id = controller.currentCat.id;
            this.data[index] = newCatInfo;
            controller.setCurrentCat(this.data[index]);
        },
        getAllCats: function() {
            return this.data;
        }
    };
    
    var controller = {
        currentCat: {},
        getCats: function() {
            return model.getAllCats();
        },
        setCurrentCat: function(cat) {
            this.currentCat = cat;
            viewCatList.render();
            viewCatList.setCurrentCatStyle();
            viewSingleCat.render();            
            viewAdmin.render();
        },
        increaseClicks: function() {
            this.currentCat.clicks++;
            viewSingleCat.render();
            viewAdmin.render();
        },
        updateCat: function(newCatInfo) {
            model.updateCatInfo(newCatInfo);
        },
        init: function(listId, singleCatId) {
            var cats = this.getCats();
            viewCatList.init(listId);
            viewSingleCat.init(singleCatId);
            viewAdmin.init();
            this.setCurrentCat(cats[0]);
        }
    };
        
    var viewCatList = {
        parentEl: null,
        setCurrentCatStyle: function() {
            var _this = this;
            _this.parentEl.children('li').removeClass('current');
            var index = controller.getCats().indexOf(controller.currentCat);
            _this.parentEl.children('li').eq(index).addClass('current');
        },
        init: function(listId) {
            this.parentEl = $(listId);
            this.render();
        },
        render: function() {
            var _this = this;
            _this.parentEl.html('');
            controller.getCats().forEach(function(cat) {      
                var li = $('<li></li>').html(cat.name);
                li.on('click', (function(newCat) {
                    return function() {            
                        controller.setCurrentCat(newCat);
                    }
                })(cat));
                _this.parentEl.append(li);  
            });              
        }
    };
    
    var viewSingleCat = {
        element: '',
        img: null,
        name: null,
        clicks: null,
        clicksCount: function() {
            controller.increaseClicks();
        },
        init: function(singleCatId) {
            this.element = $(singleCatId);
            this.img = $('#cat-img');
            this.img.on('click', this.clicksCount);
            this.name = $('#cat-name');
            this.clicks = $('#cat-clicks');
            this.render();
        },
        clearTemplate: function() {
            this.img.attr('src', '');
            this.name.html('');
            this.clicks.html('');
        },
        render: function() {
            if (this.img.attr('src') != controller.currentCat.pic) {
                this.img.attr('src', controller.currentCat.pic);        
            }            
            if (this.name.html() != controller.currentCat.name) {
                this.name.html(controller.currentCat.name);            
            }
            this.clicks.html(controller.currentCat.clicks); 
        }
    };
    
    var viewAdmin = {
        showAdminPanel: function() {
            viewAdmin.adminForm.toggle();
        },
        saveCatInfo: function(e) {
            e.preventDefault();
            var newCatInfo = {
                name: viewAdmin.newName.val().trim(),
                pic: viewAdmin.newImage.val().trim(),
                clicks: parseInt(viewAdmin.newClicks.val().trim())
            };
            controller.updateCat(newCatInfo);
            viewAdmin.showAdminPanel();
        },
        init: function() {
            this.adminButton = $('#admin-button');
            this.adminForm = $('#admin-form');
            this.newImage = $('#image');
            this.newName = $('#name');
            this.newClicks = $('#clicks');
            this.saveButton = $('#save');
            
            this.adminButton.on('click', viewAdmin.showAdminPanel);
            this.saveButton.on('click', viewAdmin.saveCatInfo);
            this.render();
        },
        render: function() {
            this.newName.val(controller.currentCat.name);
            this.newClicks.val(controller.currentCat.clicks);
            this.newImage.val(controller.currentCat.pic);
        }
    };
    
    controller.init('#cats', '#cat');
    
})(jQuery);