/* ================= Model ================= */
//creating an array object that holds all the cats in it

var model = {
    cats: [
        {
         "name": "Poplinre",
         "image": "poplinre.jpg",
         "clicks": 0 
        },
        {
         "name": "Chewie",
         "image": "chewie.jpg",
         "clicks": 0
        },
        {
         "name": "Snow",
         "image": "snow.jpg",
         "clicks": 0
        },
        {
        "name": "Cowboy",
        "image": "cowboy.jpg",
        "clicks": 0
        }
    ],
    
    admin: [
        {
            "currentAdm": null,
            "currentCatIndex": null
        }
            ],
    tempraryUpdate: [
        {
        "name": "",
        "image": "",
        "clicks": 0  
        }
    ]
        };


/*=============== Octopus ==================*/

var octopus = {
    
    init: function(){
        
        view.createCats();
        view.navBarSide();
        view.createDialog();
        
    },
    
    //function that loads the page and then add eventlistener to each image
    
    addImgListeners: function(){
        let idList = document.querySelectorAll("img");
        let elemArray = [...idList];

        elemArray.forEach( function(elem) {
        elem.addEventListener('click', function(e){
            octopus.increaseClick(e);
        }, false);
        });
    },
    
    //function that increases the clicks with every click
    increaseClick: function(e){
        let element = e.target.classList[0];
        console.log(element);
        (model.cats)[element].clicks +=1;
        view.postClick(element);
    },
    
    
    //function that adds listeners to the side bar
    
    listListeners: function(){
        document.getElementById("list").addEventListener('click', function(e){
            let targetPic = e.target.innerHTML;
            console.log(targetPic);
            let parentTarget = document.querySelector("."+targetPic+"").parentElement;
            console.log(parentTarget);
    
            view.showPic(parentTarget);
        });   
    },
    
    
    //function that shows the dialog once the admin button is clicked
    adminListener: function(){
        //get elements by the class name adminBtn because when we created the admin button each one relates to one picture
        //and we have sepearet admin burrons each one on one picture
        let buttonList = document.getElementsByClassName('buttonAdminP');
        //we get the list of the class names and put them into array
        let buttonsArray = [...buttonList];
        
        //itterate over the array to add eventListener to each button so it can show the dialog box
        buttonsArray.forEach( function(btn){
            btn.addEventListener('click', function(e){
                octopus.updatecurrentAdmin(e);
                view.showDialog();
            });
        });
    },
    
    updatecurrentAdmin: function(e){
        
        let currentElementParent = e.target.offsetParent;
        (model.admin)[0].currentAdm = (currentElementParent.id); 
        
        (model.admin)[0].currentCatIndex = currentElementParent.classList[1];
        
    },
    
    
    updateModel: function(){
        
        let curCatIndex = model.admin[0].currentCatIndex;
        
        let newName = document.getElementById('newName').value;
        let newURL = document.getElementById('imgUrl').value;
        let newClick = document.getElementById('updateClicks').value;
        
        model.tempraryUpdate[0].name = newName;
        
        model.tempraryUpdate[0].image = octopus.checkUrl(newURL, curCatIndex);
        model.tempraryUpdate[0].clicks += Number(newClick);
        
      
        
        updateCatModel.updateView();
        
    },
    
    checkUrl: function(newUrl, curCatIndex){
        if(newUrl == ""){
            return (model.cats[curCatIndex].image);
        }
        else{
            return newUrl;
        }
    },
    
    cleanBody: function(){
        let listItems = document.getElementById('list');
        let mainbody = document.getElementById('main');
        let dialogBox = document.getElementById('adminDialog');
        listItems.innerHTML = "";
        mainbody.innerHTML = "";
       // dialogBox.innerHTML = "";
        
        octopus.init();
    }
    
   
    
};



/*============== View ===================*/

var view = {
    
    //view model bulding the view
    //function that creates the cats in the dom element
    
    createCats: function(){
        let addingCats = "";
        (model.cats).forEach(function(cat, catIndex, cats){
            addingCats += "<div class='catsP "+catIndex.toString()+"' id='cat"+catIndex.toString()+"'style='display: none;'><div class='nameC "+cat.name+"'>" + cat.name +"</div><img src='" + cat.image + "' class='"+catIndex.toString()+"'><div id='" + catIndex.toString() + "'>" + cat.clicks.toString() + "</div><div class='buttonAdminP'><button id='buttonAdmin'>Admin</button></div></div>";
        });
        var picDiv = document.getElementById("main");
        picDiv.innerHTML = addingCats;
        
        octopus.addImgListeners();
    },
    
    //function that opens the cat needed and hides it
    
    showPic: function(x){
        if (x.style.display == 'none') {
            x.style.display = '';
        } else {
            x.style.display = 'none';
        }
    },
    
    showDialog: function(){
        let dialog = document.getElementById('adminDialog')
        if (dialog.style.display == 'none') {
            dialog.style.display = '';
        } else {
            dialog.style.display = 'none';
        }
        
    },
    
    
    // view model bulding the nav bar side
    //function that adds cats to the navbar
    
    navBarSide: function(){
        let barEl = document.getElementById("list");
        barEl.innerHTML += "<li class='title'>Cats</li>";
        (model.cats).forEach( function(cat, catIndex, cats){
            barEl.innerHTML += "<li id='li'><a>"+ cat.name +"</a></li>";
        });
        
        octopus.listListeners();
    },
    
    
    //post the click to the image to show the user
    postClick: function(el){
        document.getElementById(""+el+"").innerHTML = "Clicks: " + model.cats[el].clicks;
    },
    
    //function creates the dialog to the admin in order to update the cat viewed
    createDialog: function(){
        
        octopus.adminListener();
        view.dialogListener();
    },
    
     dialogListener: function(){
         
         document.getElementById('cancel').addEventListener('click', function(){
             view.showDialog();
         })
        
        document.getElementById('updateCat').addEventListener('click', function(){
            octopus.updateModel();
            view.showDialog();
        });
        
    }
};
    
    
var updateCatModel = {
    
    updateView: function(){
      
        let currentCat = model.admin[0].currentCatIndex;
        console.log(currentCat);
        model.cats[currentCat].name = model.tempraryUpdate[0].name;
        model.cats[currentCat].image = model.tempraryUpdate[0].image;
        model.cats[currentCat].clicks += model.tempraryUpdate[0].clicks;
        
        octopus.cleanBody();
       // octopus.init();
        
    },
 

};



window.onload = function(){
    octopus.init();
};



