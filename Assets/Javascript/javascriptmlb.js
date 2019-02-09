$(document).ready(function() {
  // Current Date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var today = yyyy + mm + dd;

  console.log(today);

  // Calculates Previous day
  var yesterday = new Date();
  var dd = yesterday.getDate() - 1;
  var mm = yesterday.getMonth() + 1;
  var yyyy = yesterday.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var yesterday = yyyy + mm + dd;

  // URLS done
  const MLBArray = [
    { name: "BALTIMORE ORIOLES", url: "https://www.mlb.com/orioles" },
    { name: "BOSTON RED SOX", url: "https://www.mlb.com/redsox"},
    { name: "CHICAGO WHITE SOX", url: "https://www.mlb.com/whitesox" },
    { name: "CLEVELAND INDIANS", url: "https://www.mlb.com/indians" },
    { name: "ARIZONA DIAMONDBACKS", url: "https://www.mlb.com/dbacks" },
    { name: "ATLANTA BRAVES", url: "https://www.mlb.com/braves" },
    { name: "CHICAGO CUBS", url: "https://www.mlb.com/cubs" },
    { name: "CINCINNATI REDS", url: "https://www.mlb.com/reds" },
    { name: "DETROIT TIGERS", url: "https://www.mlb.com/tigers" },
    { name: "HOUSTON ASTROS", url: "https://www.mlb.com/astros" },
    { name: "KANSAS CITY ROYALS", url: "https://www.mlb.com/royals" },
    { name: "LOS ANGELES ANGELS", url: "https://www.mlb.com/angels" },
    { name: "COLORADO ROCKIES", url: "https://www.mlb.com/Rockies" },
    { name: "LOS ANGELES DODGERS", url: "https://www.mlb.com/dodgers" },
    { name: "MIAMI MARLINS", url: "https://www.mlb.com/marlins" },
    { name: "MILWAUKEE BREWERS", url: "https://www.mlb.com/brewers" },
    { name: "MINNESOTA TWINS", url: "https://www.mlb.com/twinsbaseball" },
    { name: "NEW YORK YANKEES", url: "https://www.mlb.com/yankees" },
    { name: "OAKLAND ATHLETICS", url: "https://www.mlb.com/athletics" },
    { name: "SEATTLE MARINERS", url: "https://www.mlb.com/mariners" },
    { name: "NEW YORK METS", url: "https://www.mlb.com/mets" },
    { name: "PHILADELPHIA PHILLIES", url: "https://www.mlb.com/phillies" },
    { name: "PITTSBURGH PIRATES", url: "https://www.mlb.com/pirates" },
    { name: "SAN DIEGO PADRES", url: "https://www.mlb.com/padres" },
    { name: "TAMPA BAY RAYS", url: "https://www.mlb.com/raysbaseball" },
    { name: "TEXAS RANGERS", url: "https://www.mlb.com/texasrangers" },
    { name: "TORONTO BLUE JAYS", url: "https://www.mlb.com/bluejays" },
    { name: "SAN FRANCISCO GIANTS", url: "https://www.mlb.com/giants" },
    { name: "ST LOUIS CARDINALS", url: "https://www.mlb.com/cardinals" },
    { name: "WASHINGTON NATIONALS", url: "https://www.mlb.com/nationals" },
  ];

  // Gets Array String
  emptyArray = [];
  for (var i = 0; i < MLBArray.length; i++) {
    MLBString = MLBArray[i].name;
    JSON.stringify(MLBString);
    emptyArray.push(MLBString);
  }
  console.log(emptyArray);
  $(".awesomplete").attr("data-list", emptyArray);




    // This is creates search restrictions to teams within the object/array & loads team page
    $("#s").keypress(function(action) {
  
      if (action.which == 13) {
        var input = $("#s").val();
        var capUserInput = input.toUpperCase();
        index = -1;
  
        var modal = $("#pageModal");
        var span = $(".close")[0];
  
        for (var i = 0, len = MLBArray.length; i < len; i++) {
          if (MLBArray[i].name === capUserInput) {
            $("#s").attr("action", MLBArray[i].url);
            window.location = MLBArray[i].url;
          } else {
            // Modal display
            setTimeout(function(){
              modal[0].style.display = "block";
            }, 1000);
            span.onclick = function() {
              modal[0].style.display = "none";
            };
          }
        }
      }
    });

  // News Search API/Google Search
  var googleQueryUrl = "";

  googleQueryUrl =
    "https://newsapi.org/v2/top-headlines?country=us&category=sports&q=mlb&sortBy=publishedAT&apiKey=78289f4e7eaf44ee97fa8a64479a1163";
  $.ajax({
    url: googleQueryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (var i = 0; i < 5; i++) {
      var title = response.articles[i].title;
      var content = response.articles[i].content;
      var url = response.articles[i].url;

      newDiv1 = $("<div>");
      newDiv1.attr("id", "divId1" + [i]);
      newDiv1.attr("href", url);

      $("#mlb-headlines").append(newDiv1);

      $("#divId1" + [i]).on("click", function() {
        window.location = $(this).attr("href");
      });

      $("#divId1" + [i]).html(
        "<br><p>" + title + "<br><br>" + content + "</p><br><br>"
      );
      document.getElementById("divId1" + [i]).style.border = "outset #808080";
      document.getElementById("divId1" + [i]).style.borderWidth = "thin";
    }
  });



  // Sports Feed API
  var sportsFeedsKey = "d2b26d10-70fd-44f2-a5fb-08a4fb";
  var sportsFeedsPass = "Thisisauselesspassword!";



  // Gets Current Schedule
  $.ajax({
    type: "GET",
    url:
      "https://cors-anywhere.herokuapp.com/https://api.mysportsfeeds.com/v1.1/pull/mlb/upcoming/scoreboard.json?fordate=" +
      today,
    dataType: "json",
    async: true,
    headers: {
      Authorization: "Basic " + btoa(sportsFeedsKey + ":" + sportsFeedsPass)
    },
    data: '{ "comment" }',
    success: function(data) {
      var numGamesToday = data.dailygameschedule;
      // gameentry;

      if(numGamesToday === undefined){
        newDiv3 = $("<div>");
        newDiv3.attr("id", "divId3" + [i]);
        
        $("#mlb-schedule").append(newDiv3);
        
        $("#divId3" + [i]).html(
          "<p>There are no games today</p>");
      }else{
        numGamesToday = data.dailygameschedule.gameentry.length;
        
        for (var i = 0; i < numGamesToday; i++) {
          var homeTeam =
          data.dailygameschedule.gameentry[i].homeTeam.Abbreviation;
          var awayTeam =
          data.dailygameschedule.gameentry[i].awayTeam.Abbreviation;
          var date = data.dailygameschedule.gameentry[i].date;
          var time = data.dailygameschedule.gameentry[i].time;
          var location = data.dailygameschedule.gameentry[i].location;
          
          newDiv3 = $("<div>");
          newDiv3.attr("id", "divId3" + [i]);
          
          $("#mlb-schedule").append(newDiv3);
          
          $("#divId3" + [i]).html(
            "<p>" +
            homeTeam +
            " vs " +
            awayTeam +
            "</p><br><p>" +
            "@ " +
            location +
            "</p><br><p>" +
            date +
            " " +
            time +
            "<br><br><br></p>"
            );
          }
        }
    }
  });



  // Gets yesterdays Scores
  $.ajax({
    type: "GET",
    url:
      "https://cors-anywhere.herokuapp.com/https://api.mysportsfeeds.com/v1.1/pull/MLB/upcoming/scoreboard.json?fordate=" +
      yesterday,
    dataType: "json",
    async: true,
    headers: {
      Authorization: "Basic " + btoa(sportsFeedsKey + ":" + sportsFeedsPass)
    },
    data: '{ "comment" }',

    success: function(data1) {
      // Gets the total number of games for the day to loop over
      var numGames = data1.scoreboard.gameScore;

      if(numGames === undefined){
        newDiv2 = $("<div>");
        newDiv2.attr("id", "newDivId2" + [i]);
        
        $("#mlb-scores").append(newDiv2);
        
        $("#newDivId2" + [i]).html(
          "<p>There were no games yesterday"
      );
      } else{
        numGames = data1.scoreboard.gameScore.length;
        
        for (var i = 0; i < numGames; i++) {
          awayScore = data1.scoreboard.gameScore[i].awayScore;
          awayTeam = data1.scoreboard.gameScore[i].game.awayTeam.Abbreviation;
          
          homeScore = data1.scoreboard.gameScore[i].homeScore;
          homeTeam = data1.scoreboard.gameScore[i].game.homeTeam.Abbreviation;
          
          newDiv2 = $("<div>");
          newDiv2.attr("id", "newDivId2" + [i]);
          
          $("#mlb-scores").append(newDiv2);
          
          $("#newDivId2" + [i]).html(
            homeTeam + ": " + homeScore + " vs " + awayTeam + ": " + awayScore
        );
      }
    }
    }
  });

  // Awesomplete - Lea Verou - MIT license
  !function(){function t(t){var e=Array.isArray(t)?{label:t[0],value:t[1]}:"object"==typeof t&&"label"in t&&"value"in t?t:{label:t,value:t};this.label=e.label||e.value,this.value=e.value}function e(t,e,i){for(var n in e){var s=e[n],r=t.input.getAttribute("data-"+n.toLowerCase());"number"==typeof s?t[n]=parseInt(r):!1===s?t[n]=null!==r:s instanceof Function?t[n]=null:t[n]=r,t[n]||0===t[n]||(t[n]=n in i?i[n]:s)}}function i(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function n(t,e){return o.call((e||document).querySelectorAll(t))}function s(){n("input.awesomplete").forEach(function(t){new r(t)})}var r=function(t,n){var s=this;r.count=(r.count||0)+1,this.count=r.count,this.isOpened=!1,this.input=i(t),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-expanded","false"),this.input.setAttribute("aria-owns","awesomplete_list_"+this.count),this.input.setAttribute("role","combobox"),this.options=n=n||{},e(this,{minChars:2,maxItems:10,autoFirst:!1,data:r.DATA,filter:r.FILTER_CONTAINS,sort:!1!==n.sort&&r.SORT_BYLENGTH,container:r.CONTAINER,item:r.ITEM,replace:r.REPLACE,tabSelect:!1},n),this.index=-1,this.container=this.container(t),this.ul=i.create("ul",{hidden:"hidden",role:"listbox",id:"awesomplete_list_"+this.count,inside:this.container}),this.status=i.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-atomic":!0,inside:this.container,textContent:0!=this.minChars?"Type "+this.minChars+" or more characters for results.":"Begin typing for results."}),this._events={input:{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(t){var e=t.keyCode;s.opened&&(13===e&&s.selected?(t.preventDefault(),s.select()):9===e&&s.selected&&s.tabSelect?s.select():27===e?s.close({reason:"esc"}):38!==e&&40!==e||(t.preventDefault(),s[38===e?"previous":"next"]()))}},form:{submit:this.close.bind(this,{reason:"submit"})},ul:{mousedown:function(t){t.preventDefault()},click:function(t){var e=t.target;if(e!==this){for(;e&&!/li/i.test(e.nodeName);)e=e.parentNode;e&&0===t.button&&(t.preventDefault(),s.select(e,t.target))}}}},i.bind(this.input,this._events.input),i.bind(this.input.form,this._events.form),i.bind(this.ul,this._events.ul),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||n.list||[],r.all.push(this)};r.prototype={set list(t){if(Array.isArray(t))this._list=t;else if("string"==typeof t&&t.indexOf(",")>-1)this._list=t.split(/\s*,\s*/);else if((t=i(t))&&t.children){var e=[];o.apply(t.children).forEach(function(t){if(!t.disabled){var i=t.textContent.trim(),n=t.value||i,s=t.label||i;""!==n&&e.push({label:s,value:n})}}),this._list=e}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return this.isOpened},close:function(t){this.opened&&(this.input.setAttribute("aria-expanded","false"),this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,this.status.setAttribute("hidden",""),i.fire(this.input,"awesomplete-close",t||{}))},open:function(){this.input.setAttribute("aria-expanded","true"),this.ul.removeAttribute("hidden"),this.isOpened=!0,this.status.removeAttribute("hidden"),this.autoFirst&&-1===this.index&&this.goto(0),i.fire(this.input,"awesomplete-open")},destroy:function(){if(i.unbind(this.input,this._events.input),i.unbind(this.input.form,this._events.form),!this.options.container){var t=this.container.parentNode;t.insertBefore(this.input,this.container),t.removeChild(this.container)}this.input.removeAttribute("autocomplete"),this.input.removeAttribute("aria-autocomplete");var e=r.all.indexOf(this);-1!==e&&r.all.splice(e,1)},next:function(){var t=this.ul.children.length;this.goto(this.index<t-1?this.index+1:t?0:-1)},previous:function(){var t=this.ul.children.length,e=this.index-1;this.goto(this.selected&&-1!==e?e:t-1)},goto:function(t){var e=this.ul.children;this.selected&&e[this.index].setAttribute("aria-selected","false"),this.index=t,t>-1&&e.length>0&&(e[t].setAttribute("aria-selected","true"),this.status.textContent=e[t].textContent+", list item "+(t+1)+" of "+e.length,this.input.setAttribute("aria-activedescendant",this.ul.id+"_item_"+this.index),this.ul.scrollTop=e[t].offsetTop-this.ul.clientHeight+e[t].clientHeight,i.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(t,e){if(t?this.index=i.siblingIndex(t):t=this.ul.children[this.index],t){var n=this.suggestions[this.index];i.fire(this.input,"awesomplete-select",{text:n,origin:e||t})&&(this.replace(n),this.close({reason:"select"}),i.fire(this.input,"awesomplete-selectcomplete",{text:n}))}},evaluate:function(){var e=this,i=this.input.value;i.length>=this.minChars&&this._list&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map(function(n){return new t(e.data(n,i))}).filter(function(t){return e.filter(t,i)}),!1!==this.sort&&(this.suggestions=this.suggestions.sort(this.sort)),this.suggestions=this.suggestions.slice(0,this.maxItems),this.suggestions.forEach(function(t,n){e.ul.appendChild(e.item(t,i,n))}),0===this.ul.children.length?(this.status.textContent="No results found",this.close({reason:"nomatches"})):(this.open(),this.status.textContent=this.ul.children.length+" results found")):(this.close({reason:"nomatches"}),this.status.textContent="No results found")}},r.all=[],r.FILTER_CONTAINS=function(t,e){return RegExp(i.regExpEscape(e.trim()),"i").test(t)},r.FILTER_STARTSWITH=function(t,e){return RegExp("^"+i.regExpEscape(e.trim()),"i").test(t)},r.SORT_BYLENGTH=function(t,e){return t.length!==e.length?t.length-e.length:t<e?-1:1},r.CONTAINER=function(t){return i.create("div",{className:"awesomplete",around:t})},r.ITEM=function(t,e,n){return i.create("li",{innerHTML:""===e.trim()?t:t.replace(RegExp(i.regExpEscape(e.trim()),"gi"),"<mark>$&</mark>"),role:"option","aria-selected":"false",id:"awesomplete_list_"+this.count+"_item_"+n})},r.REPLACE=function(t){this.input.value=t.value},r.DATA=function(t){return t},Object.defineProperty(t.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),t.prototype.toString=t.prototype.valueOf=function(){return""+this.label};var o=Array.prototype.slice;i.create=function(t,e){var n=document.createElement(t);for(var s in e){var r=e[s];if("inside"===s)i(r).appendChild(n);else if("around"===s){var o=i(r);o.parentNode.insertBefore(n,o),n.appendChild(o),null!=o.getAttribute("autofocus")&&o.focus()}else s in n?n[s]=r:n.setAttribute(s,r)}return n},i.bind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.addEventListener(e,n)})}},i.unbind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.removeEventListener(e,n)})}},i.fire=function(t,e,i){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0);for(var s in i)n[s]=i[s];return t.dispatchEvent(n)},i.regExpEscape=function(t){return t.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},i.siblingIndex=function(t){for(var e=0;t=t.previousElementSibling;e++);return e},"undefined"!=typeof self&&(self.Awesomplete=r),"undefined"!=typeof Document&&("loading"!==document.readyState?s():document.addEventListener("DOMContentLoaded",s)),r.$=i,r.$$=n,"object"==typeof module&&module.exports&&(module.exports=r)}();
  //# sourceMappingURL=awesomplete.min.js.map
});