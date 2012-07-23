(function() {

  if (("standalone" in window.navigator) && !window.navigator.standalone && window.navigator.userAgent.match(/(iPhone|iPod)/i)) {

    //Assume iScoll in the case of the old Joshfire framework
    var hasiScroll = window.iScroll || (typeof Joshfire!="undefined" && (Joshfire.adapter=="ios"||Joshfire.adapter=="android") && Joshfire.version && Joshfire.version[0]===0);

    window.addEventListener("load",function() {

      document.body.style.height="100%";

      var elt=false;

      var resize = function() {
        
        if (elt) {
          elt.style.height="100%";
          elt.style.height = (elt.offsetHeight+60)+"px";
        }
        
        window.scrollTo(0,1);
      };

      if (hasiScroll) {

        // Find, if any, the element which has the maximum weight and should influence iScroll
        // This is a bit heuristic, test it with more apps!
        var findMaxHeight = function(elt) {
         for (var i=0;i<elt.children.length;i++) {
           if (elt.children[i].offsetHeight==window.innerHeight) {
             return elt.children[i];
           }
         }
         var felt;
         for (i=0;i<elt.children.length;i++) {
           felt=findMaxHeight(elt.children[i]);
           if (felt) return felt;
         }
         return null;
        };

        setTimeout(function() {
          elt = findMaxHeight(document.body);
          window.addEventListener("resize",resize);
          resize();

        },1000);
        
      } else {
        setTimeout(resize,0);
      }
    
    });

  }

})();