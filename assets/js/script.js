$(document).ready(function(){
  $(".up-button").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });


  if($('.large-part .pic-list').length){
    $('.slider-img').each(function(){
      $('.large-part .pic-list', this).css('width', $('.large-part .pic-list > .img-wrap', this).length * $('.large-part').width() + 'px');
      $('.small-part .pic-list', this).css('width', $('.small-part .pic-list > .img-wrap', this).length * ($('.small-part .pic-list > .img-wrap').width() + 22) + 'px');
      $('.large-part .img-wrap', this).css('width', $('.large-part', this).width());
    });
  }
  $('.slider-img .button-right').on('click', function(){
    if(parseFloat($(this).parent('.large-part').children('.pic-list').css('margin-left').slice(0,-2)) > -$(this).parent('.large-part').children('.pic-list').width() + $('.large-part .img-wrap').width()){
      $(this).parent('.large-part').children('.pic-list').css('margin-left', parseFloat($(this).parent('.large-part').children('.pic-list').css('margin-left').slice(0,-2)) - $('.large-part .img-wrap').width() + 'px');
      $(this).parent().parent().children('.small-part').animate({scrollLeft: '+=' + ($(this).parent().parent().children('.small-part').children().children('.img-wrap').width() + 22) }, 500);
    }
  });
  $('.slider-img .button-left').on('click', function(){
    if(parseFloat($(this).parent('.large-part').children('.pic-list').css('margin-left').slice(0,-2)) < 0){
      $(this).parent('.large-part').children('.pic-list').css('margin-left', parseFloat($(this).parent('.large-part').children('.pic-list').css('margin-left').slice(0,-2)) + $('.large-part .img-wrap').width() + 'px');
      $(this).parent().parent().children('.small-part').animate({scrollLeft: '-=' + ($(this).parent().parent().children('.small-part').children().children('.img-wrap').width() + 22) }, 500);
    }
  });
  $('.slider-img .small-part .img-wrap').on('click', function(){
    $(this).parent().parent('.small-part').parent('.slider-img').children('.large-part').children('.pic-list').css('margin-left', - $(this).index() * $('.large-part .img-wrap').width() + 'px');
  });

  // phone input mask
  $('input[name="phone"]').inputmask("+380 (99) - 999- 99 - 99");

  // hamburger-menu
  $('.hamburger').on('click', function(){
    if($('.nav .menu').hasClass('active')){
      $('.nav .menu').removeClass('active');
      $(this).parent().removeClass('active');
    }else{
      $('.nav .menu').addClass('active');
      $(this).parent().addClass('active');
    }
  });

  // fiter
  $("#area-slider").slider({});

  $('.list-view-control .in-tail').on('click', function(){
    $('.projects-list').removeClass('in-row');
  });
  $('.list-view-control .in-row').on('click', function(){
    $('.projects-list').addClass('in-row');
  });

  // gallery slider
  $('.project-gallery').slick({
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipe: false,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
  });

  $('.slick-arrow').on('click', function(){
    $('.slick-arrow').css('opacity', 0);
    $('.gallery-digit .active-slick-img').text($('.slick-current .img-wrap').attr('data-number'));
    setTimeout(function(){
      $('.slick-arrow').css('opacity', 1);
    }, 500)
  });

  if($('.gallery-digit').length){
    var slides_n = 0;
    var i = 1;
    $('.project-gallery .slick-slide:not(.slick-cloned) .img-wrap').each(function(){
      $(this).attr('data-number', i);
      i++;
    });
    $('.project-gallery .img-wrap').each(function(){
      if($(this).attr('data-number') > slides_n){
        slides_n = $(this).attr('data-number');
      }
    });
    $('.gallery-digit .slick-img-number').text(slides_n);
  }

  // about us page slider
  $('.our-project-slider').slick({
    centerPadding: '15px',
    slidesToShow: 4,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [{

      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        infinite: true
      }

    }, {

      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        infinite: true
      }

    }]
  });

  $('.like-dot-slick').on('click',function(){
    if(!$(this).hasClass('active')){
      $('.our-project-slider').slick('slickGoTo', $(this).attr('data-q-slide'));
      $('.like-dot-slick').removeClass('active');
      $(this).addClass('active');
    }
  });

  if($(window).width() <= 568){
    $('table').wrap('<div class="scroll-table"></div>');
  }


  if($('.category-filter select').length){
    $('option', this).attr('selected', false);
    $('option[value="' + window.location.pathname.slice(1) + '"]',this).attr('selected', true);
  }
  $('.category-filter select').on('change', function(){
    window.location.href = $(this).val();
  });



  $('.file input').on('change', function(){
    var file = $(this)[0].files[0].name;
    $('.file span').html('<img src="assets/img/close-file.png" class="fa-close" onclick="closeFile(event)"> ' + file);
  });

  $('a').click((event) => {
    event.preventDefault();
  })

});
function closeFile(e){
  e.preventDefault();
  $('.file span').html('<img src="assets/img/paper-clip.svg" alt="" width="17px" height="17px"> Прикрепите файл для загрузки');
}

$(document).on('scroll', function(){
  if($(document).scrollTop() >= 1000){
    $(".up-button").css('display', 'block');
  }else{
    $(".up-button").css('display', 'none');
  }
});
// up button

if($('.inside-header .back a').length && $('.inside-header .back a').attr('href') == '0'){
  $('.inside-header .back a').attr('href', '/');
}


  //E-mail Ajax Send
	$('form').submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../../controllers/mail.php", //Change
			data: th.serialize(),
			beforeSend: function () {
			}
		}).done(function () {
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		}).fail(function () {
			alert("Ошибка отправки, попробуйте позже")
		});
		return false;
	});
	
	//E-mail Ajax Send