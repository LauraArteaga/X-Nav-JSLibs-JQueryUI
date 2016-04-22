
$(document).ready(function(){


  $(function() {


    $( "#menu" ).menu({
      position: { my: "top", at: "bottom" }
    });

    var date = new Date();
    var hour = String(date.getHours());
    var minutes = String(date.getMinutes());
    var shown = false;

    $("#date").html(hour + ":" + minutes);
    $("#date").click(function(){
      if (!shown) {
        $("#calendar").datepicker({
          inline: true
        });
        $("#calendar").show();
        shown = true;
      } else {
        $("#calendar").hide();
        shown = false;
      }
    });

    var $gallery = $( "#gallery" ),
      $trash = $( "#trash" );


    $( "li", $gallery ).draggable({
      cancel: "a.ui-icon",
      revert: "invalid",
      containment: "document",
      helper: "clone",
      cursor: "move"
    });

    $trash.droppable({
      accept: "#gallery > li",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        deleteImage( ui.draggable );
      }
    });

    $gallery.droppable({
      accept: "#trash li",
      activeClass: "custom-state-active",
      drop: function( event, ui ) {
        recycleImage( ui.draggable );
      }
    });

    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
    function deleteImage( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $trash ).length ?
          $( "ul", $trash ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );

        $item.find( "a.ui-icon-trash" ).remove();
        $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "48px" })
            .find( "img" )
              .animate({ height: "36px" });
        });
      });
    }

    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "96px")
          .append( trash_icon )
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( $gallery )
          .fadeIn();
      });
    }

    $( "ul.gallery > li" ).click(function( event ) {
      var $item = $( this ),
        $target = $( event.target );

      if ( $target.is( "a.ui-icon-trash" ) ) {
        deleteImage( $item );
      } else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
      }

      return false;
    });
  });
});
