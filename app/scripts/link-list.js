'use strict';

var UOL = window.UOL || function() {};
UOL.browserBoot = function() {};

UOL.browserBoot = {

    init: function() {

        UOL.browserBoot.search.init();
        UOL.browserBoot.carousel.init();
        UOL.browserBoot.menu.init();
        UOL.browserBoot.especialButtons.jira.init();
        UOL.browserBoot.especialButtons.lmgtfu.init();

    },

    search: {

        init: function() {

            // Inicializa as funcionalidades da Busca Fake do Google
            var $inputVal = $('form#googleSearch #googleSearchQuery');

            $inputVal.focus();

            if ($inputVal.val() !== '') {
                $inputVal.css('backgroundImage', 'none');
            } else {
                $inputVal.css('backgroundImage', 'url(\'images/icons/bgOraculo.png\')');
            }

            $inputVal.keyup(function() {
                if ($(this).val() !== '') {
                    $(this).css('backgroundImage', 'none');
                } else {
                    $(this).css('backgroundImage', 'url(\'images/icons/bgOraculo.png\')');
                }
            });

            this.cheatGoogle();
        },


        cheatGoogle: function() {

            var inputVal = $('form#googleSearch #googleSearchQuery').val();
            var $form = $('form#googleSearch');
            var action = $('form#googleSearch').attr('action');

            if (inputVal === '') {
                return false;
            } else {
                $form.attr('action', action + inputVal);
            }

        }


    },


    carousel: {

        init: function() {

            // Move o Carrossel de acordo com a Roda do Mouse
            $('body').bind('mousewheel DOMMouseScroll', function(e) {

                var delta = 0;

                if (e.type === 'mousewheel') {
                    delta = e.originalEvent.wheelDelta;
                } else if (e.type === 'DOMMouseScroll') {
                    delta = e.originalEvent.detail;
                }

                if (delta > 0) {
                    $('#myCarousel').carousel('next');
                } else {
                    $('#myCarousel').carousel('prev');
                }

                e.preventDefault();

            });


            $('#myCarousel').on('slid.bs.carousel', function(){

                var carouselData = $(this).data('bs.carousel');
                var currentIndex = carouselData.getActiveIndex();

                var prevMenuElement = $('ul.nav.navbar-nav li.active' );
                prevMenuElement.removeClass('active');

                var nextMenuElement = $('ul.nav.navbar-nav li:eq(' + currentIndex + ')' );
                nextMenuElement.addClass('active');

            });


        }

    },


    menu : {

        init : function(){
            this.setCollapseListenersForMobiles();
        },

        setCollapseListenersForMobiles : function(){

            $('.navbar-collapse li').click(function(){
                $('.navbar-collapse').collapse('hide');
                $('.modal-shadow').hide();
            });


            $('.navbar-collapse').on('shown.bs.collapse', function(){
                $('.modal-shadow').show();
            });


            $('.modal-shadow').click(function(){
                $('.navbar-collapse').collapse('hide');
                $('.modal-shadow').hide();
            });

        }

    },


    especialButtons: {

        jira: {

            init: function() {
                this.activateJiraButton();
            },

            activateJiraButton: function() {
                $('#bkButton').click(function() {
                    var bk = prompt('Por favor, informe o ID da historia.');
                    if (bk !== '' && bk !== null) {
                        UOL.browserBoot.especialButtons.jira.openBackLog(bk);
                    }
                });
            },

            openBackLog: function(bk) {
                window.location = 'https://jira.intranet.uol.com.br/jira/browse/' + bk;
            }

        },

        lmgtfu: {

            init: function() {
                this.activateLmgtfuButton();
            },

            activateLmgtfuButton: function() {
                $('#lmgtfu').click(function() {
                    var q = prompt('Por favor, informe query do Google:');
                    if (q !== '' && q !== null) {
                        UOL.browserBoot.especialButtons.lmgtfu.openBackLog(q);
                    }
                });
            },

            openBackLog: function(q) {
                window.location = 'http://lmgtfy.com/?q=' + q;
            }

        }

    }


};


$('document').ready(function() {
    UOL.browserBoot.init();
});
