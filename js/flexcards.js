//console.log("Width: " + $(window).innerWidth());
//console.log("Boxes: " + "{{cards|length}}");

var ids = $( ".card" ).map(function() {if (this.id) { return this.id;}}).get();

var tempcols = [];

function getColumns(cols) {
    switch(true) {
    case cols == 4:
        var tempcols = [[],[],[],[]];
        break;
    case cols == 3:
        var tempcols = [[],[],[]];
        break;
    case cols == 2:
        var tempcols = [[],[]];
        break;
    case cols == 1:
        var tempcols = [[]];
        break;
    default:
        var tempcols = [[]];
    } 
    
    //console.log(JSON.stringify(tempcols));
    
    for (i = 0; i < ids.length; i+=1) {
        if (i % cols == 0) {
            for (j = 0; j < cols; j += 1) {
                if (ids[i+j] != null) {
                    tempcols[j].push(ids[i+j]);
                }
            }
        }
    }
    
    //console.log(JSON.stringify(tempcols));
    return tempcols;
}

function sortLayout(cols) {
    
    var tempcols = getColumns(cols);
    
    for (i = 0; i < tempcols.length; i+=1) {
    
        $('#column-'+i).prepend($('#'+tempcols[i][0]));
        //console.log('#column-'+i + ' prepends #'+tempcols[i][0]);
        for (j = 0; j < tempcols[0].length; j+=1) {
            $('#column-'+i+' #'+tempcols[i][j]).append($('#'+tempcols[i][j+1]));
            //console.log('#column-' + i + ' #'+tempcols[i][j] + ' appends #'+tempcols[i][j+1]);
        }
    }
    
}

var resizeTimer, width;
var mobile = tablet = desksmall = deskwide = desklarge = false;


$(window).on("load resize",function(e) {
    clearTimeout(resizeTimer);
    // timer set to null for stress
    resizeTimer = setTimeout(breakpointChange(), 0);
});

function breakpointChange() {
    width = window.innerWidth;

    if (!mobile && width < 577) {
        tablet = desksmall = deskwide = desklarge = false;
        mobile = true;
        sortLayout(1);
    }

    if (!tablet && width > 578 && width < 768) {
        mobile = desksmall = deskwide = desklarge = false;
        tablet = true;
        sortLayout(1);
    }

    if (!desksmall && width >= 769 && width < 992) {
        mobile = tablet = deskwide = desklarge = false;
        desksmall = true;
        sortLayout(2);
    }
    
    if (!deskwide && width >= 992 && width < 1200) {
        mobile = tablet = desksmall = desklarge = false;
        deskwide = true;
        sortLayout(3);
    }
    
    if (!desklarge && width >= 1200) {
        mobile = tablet = desksmall = deskwide = false;
        desklarge = true;
        sortLayout(4);
    }
}