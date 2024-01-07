/* globals riot */
var SRE_conference_show;
var dd = console.log;


!(function(){
	var SRE = {
		SERVER: 'backoffice.ccbsgreece.gr',
		API_VERSION: '1.0',
		price: function(num) {
			if (!num){
				return '0.00';
			}
			num = +num;
			return num.toFixed(2);
		},
		load_css: function(src){
			return document.head.querySelectorAll('link[data-src="' + src + '"]').length ?
			   Promise.resolve(true) :
			   new Promise(function(resolve, reject) {
			      var css_element = document.createElement('link');
			      css_element.onload = resolve;
			      css_element.onerror = reject;
			      css_element.href = src;
			      css_element.type = 'text/css';
			      css_element.rel = 'stylesheet';
			      css_element.setAttribute('data-src', src);
		  	    	document.head.appendChild(css_element);
		   	});
		},

		load_script: function(src){
			return document.head.querySelectorAll('script[data-src="' + src + '"]').length ?
			   Promise.resolve(true) :
			   new Promise(function(resolve, reject) {
			      var script_element = document.createElement('script');
			      script_element.onload = resolve;
			      script_element.onerror = reject;
			      script_element.src = src;
			      script_element.setAttribute('data-src', src);
			      document.head.appendChild(script_element);
			   });
		},
		twodigits: function(val) {
			return ((''+val).length == 1 ? '0':'') + val;
		},
		date: {
			now: new Date(),
			display_date: function(date_str) {
				return date_str.split(' ')[0].split('-').reverse().join('/');
			},
			ymd_from_db: function(date_str) {
				return date_str.split(' ')[0];
			},
			ymd_from_object: function(date) {
			   if (date.constructor == Date){
			      return date.getFullYear() + '-' + SRE.twodigits(date.getMonth()+1) + '-' + SRE.twodigits(date.getDate());
			   }
			   throw new Error('SRE.date_from_object requires a Date Object');
			},
			date_object_from_string: function(dt_string) {
				if (dt_string.constructor == Date){
					return dt_string;
				}
				dt_string = dt_string.split(' ')[0];
			   var regEx = /^\d{4}-\d{2}-\d{2}$/;
			   if (!dt_string.match(regEx)){
			      return null;
			   }
			   // dt_string = dt_string.split('-').reverse().join('-');
			   var d = new Date(dt_string);
			   if (Number.isNaN(d.getTime())){
			      return null;
			   }

			   return d.toISOString().slice(0,10) === dt_string ? d : null;
			},
			days_diff: function(date1, date2) {
				var timeDiff = Math.abs(date1.getTime() - date2.getTime());
				var toret = Math.ceil(timeDiff / (1000 * 3600 * 24));
				return toret;
			}
		},
		utils: {
			is_email: function(email){
				return email.length > 6 && email.indexOf('@') > 0 && email.lastIndexOf('.') > 3 && email.lastIndexOf('.') > 1+email.indexOf('@');
			}
		}
	}
	var make_tag = function(){
		SRE.app = riot.observable();
		SRE.app.conference_id = 27;
riot.tag2('sre-carousel', '<div class="sre-carousel-image" data-ref="bg" riot-style="height:{state.height}px; background-image:url(\'{state.filename}\')"></div> <div class="sre-shadow"></div> <div class="sre-label"> <div>{state.label}</div> <span onclick="{clicks.click_bullet}" class="sre-bullet {idx == parent.state.current ? \'active\': \'\'}" each="{t, idx in Array(state.images.length)}"></span> </div> <a class="sre-arrow sre-left" href="#" onclick="{clicks.to_left}"></a> <a class="sre-arrow sre-right" href="#" onclick="{clicks.to_right}"></a>', 'sre-carousel,[data-is="sre-carousel"]{display:block; position:relative; background:#000;} sre-carousel .sre-carousel-image,[data-is="sre-carousel"] .sre-carousel-image{background-repeat:no-repeat; background-position:center; background-size:cover; transition:.3s} sre-carousel .sre-carousel-image.sre-is-hidden,[data-is="sre-carousel"] .sre-carousel-image.sre-is-hidden{ opacity:0; transition:.3s} sre-carousel .sre-arrow,[data-is="sre-carousel"] .sre-arrow{position:absolute; bottom:12px; transform:rotate(45deg); width:30px; height:30px; display:block; z-index:2;} sre-carousel .sre-arrow.sre-left,[data-is="sre-carousel"] .sre-arrow.sre-left{border-bottom:6px solid #fff; border-left:6px solid #fff; left:15px;} sre-carousel .sre-arrow.sre-right,[data-is="sre-carousel"] .sre-arrow.sre-right{border-top:6px solid #fff; border-right:6px solid #fff; right:15px;} sre-carousel .sre-shadow,[data-is="sre-carousel"] .sre-shadow{position:absolute; bottom:0; left:0; right:0; height:54px; background:rgba(0,0,0,.2);} sre-carousel .sre-label,[data-is="sre-carousel"] .sre-label{position:absolute; bottom:5px; left:0; right:0; padding:0 50px; text-align:center; color:#fff;} sre-carousel .sre-bullet,[data-is="sre-carousel"] .sre-bullet{display:inline-block; width:15px; height:15px; background:#fff; border-radius:50%; margin:6px 10px 0 10px;} sre-carousel .sre-bullet.active,[data-is="sre-carousel"] .sre-bullet.active{background:#f2c900;}', '', function(opts) {
		var tag = this;

		this.state = {
			key: this.opts.key || 'gal',
			current: 0,
			label: '',
			filename: ''
		};

		this.state.images = this.opts.imgs.reduce(function(all, entry) {
			if (entry.value && entry.key == tag.state.key ) {
				all.push({
					title: (entry.attributes.find(function(attr) {
						return attr.key == 'title';
					}) || {value: tag.opts.title }).value,
					filename: tag.opts.root + entry.value
				});
			}
			return all;
		}, [{
			title: this.opts.title,
			filename: tag.opts.root + this.opts.img
		}]);

		this.setup_scroller = function() {
			var w = tag.root.getBoundingClientRect().width;
			tag.state.height = (w/2);
			tag.set_active();
		};
		this.set_active = function() {
			tag.refs.bg.className = 'sre-carousel-image sre-is-hidden';
			setTimeout(function(){
				tag.state.filename = tag.state.images[tag.state.current].filename;
				tag.state.label = tag.state.images[tag.state.current].title;
				var w = tag.root.getBoundingClientRect().width;
				tag.refs.bg.className = 'sre-carousel-image';
				tag.state.height = (w/2);
				tag.update();
			}, 310);
		};

		this.clicks = {
			to_left: function(event) {
				event.preventDefault();
				tag.state.current--;
				if (tag.state.current < 0){
					tag.state.current = tag.state.images.length-1;
				}
				tag.set_active();
			},
			to_right: function(event) {
				event.preventDefault();
				tag.state.current++;
				if (tag.state.current == tag.state.images.length){
					tag.state.current = 0;
				}
				tag.set_active();
			},
			click_bullet: function(event) {
				event.preventDefault();
				tag.state.current = event.item.idx;
				tag.set_active();
			}
		};

		this.on('mount', function(){
			setTimeout(this.setup_scroller, 100);
		});

});
riot.tag2('sre-raw', '', '', '', function(opts) {
		this.updt = () => {
			this.root.innerHTML = this.opts.txt;
		};
		this.on('update', this.updt);
		this.updt();
});
riot.tag2('sre-registration-error', '<div class="sre-pad-b"> <p class="sre-bold">Errors occured:</p> <div each="{error in parent.state.error}"> &bull; <span class="sre-bold">{error.entity}</span>: {error.message} </div> <br><br> <div class="sre-button-container"> <div class="sre-to-right sre-button sre-prev" onclick="{hideme}">BACK</div> &nbsp; </div> </div>', '', '', function(opts) {
		this.hideme = function(event) {
			event.preventUpdate = true;
			this.parent.helpers.reset_registration_message();
		}.bind(this);
});
riot.tag2('sre-registration-thanks', '<div class="sre-pad-b"> <h4 class="sre-text-center">Thank you, {opts.state.fullname}!</h4> <div class="sre-pad-b" if="{opts.state.payment_method == \'cc\'}" style="margin-bottom:10px; padding-top:0"> <p class="sre-text-center">An email was sent to <span class="bold">{opts.state.email}</span> with the billing proforma.</p> <p class="sre-text-center">If you can\'t find the email in your inbox, please make sure you also check your spam folder</p> <p class="sre-text-center"> You will be redirected to the Eurobank secure payment site where you can pay with your credit card.<br> The amount you are required to pay is <span class="sre-bold">{opts.state.amount}&euro;</span> </p> <div style="border:1px solid #000; padding:10px 0px; margin:10px 0 5px 0; font-weight:bold" class="sre-text-center"> <span class="sre-bold">Important:</span> In order to match your reservation with our payment system, please use the following Reservation Id at the Comments section of the Eurobank Form.<br> <span style="font-size:36px;">{opts.state.refid}</span> </div> <p>&nbsp;</p> <p class="sre-text-center"><a class="sre-button" href="#" onclick="{redirect_now}">Redirecting in {secs}</a></p> </div> <div class="sre-pad-b" if="{opts.state.payment_method == \'bank\'}" style="margin-bottom:10px"> <p class="sre-text-center">An email was sent to <span class="bold">{opts.state.email}</span> with the billing proforma and full instructions on how to complete the payment.</p> <p class="sre-text-center">If you can\'t find the email in your inbox, please make sure you also check your spam folder</p> <p class="sre-bold sre-text-center">Keep in mind that the process will be finalized once the full payment of <span class="sre-bold">{opts.state.amount}&euro;</span> is received.</p> <div style="border:1px solid #000; padding:10px 0px; margin:10px 0 5px 0; font-weight:bold" class="sre-text-center"> <span class="sre-bold">Important:</span> In order to match your reservation with our payment system, please use the following Reservation Id at the Comments section of the Eurobank Form.<br> <span style="font-size:36px;">{opts.state.refid}</span> </div> </div> <div class="sre-pad-b" style="color:#f00; font-weight:bold; text-align:center"> Conference organizers would like to strongly emphasize that, for registration purposes and accommodation offers, only the official website, as well as the links and contacts advised herein should be used.<br> There is only one contact point for and this is: CCBS Greece </div> <p class="sre-text-center"> <br> This service is brought to you by:<br> <a href="https://www.ccbsgreece.gr" target="_blank"><img src="//backoffice.ccbsgreece.gr/img/ccbs_logo.png" style="height:48px; display:inline-block"></a> </p> <div class="sre-button-container" if="{opts.state.payment_method == \'bank\'}"> <div class="sre-to-right sre-button sre-close" onclick="{closeall}">CLOSE</div> &nbsp; </div> </div>', '', '', function(opts) {
		this.secs = 29;
		this.interval = null;

		var tag = this;

		this.on('mount', function() {
			dd('mounting!');
			if (tag.opts.state.payment_method == 'cc') {
				tag.interval = setInterval(tag.checkTimeout, 1000);
			}
		});

		this.checkTimeout = function() {
			tag.secs--;
			if (tag.secs == 0) {
				tag.redirect_now();
			}
			tag.update();
		};
		this.redirect_now = function(event) {
			if (event) {
				event.preventDefault();
			}
			clearInterval(tag.interval);
			document.location.href = 'https://livepay.gr/en/payments/ccbs-greece/';
		};

		this.closeall = function(event) {
			event.preventUpdate = true;
			tag.parent.close_now(event);
			tag.parent.update();
		};

});
riot.tag2('sre-syn-intro', '<div class="sre-contentss"> <div class="intro-data"> <img riot-src="//{dad.SRE.SERVER + dad.conf.image.value}" style="width:100%; vertical-align:top"> <br> <br> <div class="sre-bold sre-show-desktop"> Dates: </div> <div class="sre-small-font"> {dad.SRE.date.display_date(dad.conf.date_from)} - {dad.SRE.date.display_date(dad.conf.date_to)} </div> <br class="sre-show-desktop"> <div class="sre-bold sre-show-desktop"> Where: </div> <div class="sre-small-font"> {dad.conf.venue} </div> </div> <div class="intro-texts"> <sre-raw txt="{dad.conf.intro}"></sre-raw> <br class="sre-show-mobile"> <br class="sre-show-mobile"> <br class="sre-show-mobile"> </div> </div> <div class="sre-button-container step-1-button-place"> <div class="sre-button sre-next sre-to-right" onclick="{dad.next_step}">NEXT</div> <span class="sre-ccbs-sig" class="sre-small-font"> <div class="sre-show-desktop">Powered by</div> <a href="https://www.ccbsgreece.gr" target="_blank"><img riot-src="//{dad.SRE.SERVER}/img/ccbs_logo.png"></a> </span> </div>', 'sre-syn-intro .intro-texts,[data-is="sre-syn-intro"] .intro-texts{margin-top:20px;} sre-syn-intro .sre-ccbs-sig,[data-is="sre-syn-intro"] .sre-ccbs-sig{width:145px; display: inline-block; text-align: center;} sre-syn-intro .sre-ccbs-sig img,[data-is="sre-syn-intro"] .sre-ccbs-sig img{width:100%;} @media screen and (max-width:560px) { sre-syn-intro .step-1-button-place,[data-is="sre-syn-intro"] .step-1-button-place{position:fixed; bottom:0; width:100%; background:#fff; padding:10px!important;} } @media screen and (min-width:561px) { sre-syn-intro .sre-contentss,[data-is="sre-syn-intro"] .sre-contentss{display:flex} sre-syn-intro .intro-data,[data-is="sre-syn-intro"] .intro-data{width:20%; margin-right:30px;} sre-syn-intro .intro-texts,[data-is="sre-syn-intro"] .intro-texts{width:80%; margin-top:0;} sre-syn-intro .step-1-button-place,[data-is="sre-syn-intro"] .step-1-button-place{position:relative;} }', '', function(opts) {
		var tag = this;
		this.dad = this.parent;
});
riot.tag2('sre-syn-summary', '<div class="sre-sum sre-contents {\'visible\' : dad.state.is_sum_visible}"> <div if="{!dad.state.is_billing_visible}"> <div class="sre-line sre-text-center sre-big-font sre-bold"> Summary </div> <div class="sre-line sre-pad-l" if="{dad.state.has_tickets}"> <span class="sre-bold">Registration:</span> <span if="{dad.state.selected_ticket_id}"> {dad.state.selected_mainticket_name} / <span if="{!dad.state.variation}">{dad.state.selected_ticket_name}</span> <span if="{dad.state.variation}">{dad.state.variation.name}</span> </span> <span if="{!dad.state.selected_ticket_id && dad.state.is_guest}">Already registered</span> <span if="{!dad.state.selected_ticket_id && !dad.state.is_guest}">No ticket selected yet.</span> <span class="sre-to-right sre-bold" if="{dad.state.selected_ticket_id}"> {dad.SRE.price(dad.state.selected_ticket_price)}&euro; </span> <div class="sre-pad-l" if="{dad.state.is_final_step}"> {dad.postdata.user.title} <span class="sre-bold">{dad.postdata.user.firstname} {dad.postdata.user.lastname}</span>, {dad.postdata.user.company}.<br> Mobile: {dad.postdata.user.mobile}, Email: {dad.postdata.user.email} </div> </div> <div class="sre-line sre-pad-l" if="{dad.state.has_hotels}"> <span class="sre-bold">Accomodation:</span> {dad.state.accommodation.price ? dad.state.accommodation.selected_hotel.name + \'/\' + dad.state.accommodation.selected_room.name : \'No accommodation selected.\'} <div class="sre-pad-l" if="{dad.state.accommodation.price}"> <div> <span class="sre-to-right sre-bold"> {dad.state.accommodation.needs_confirm ? \'Estimated: \': \'\'} {dad.SRE.price(dad.state.accommodation.price)}&euro; </span> {dad.SRE.date.display_date(dad.SRE.date.ymd_from_object(dad.state.accommodation.date_from))} - {dad.SRE.date.display_date(dad.SRE.date.ymd_from_object(dad.state.accommodation.date_to))} (<span class="sre-bold">{dad.state.accommodation.selected_room.max_pax} guests, {dad.state.accommodation.total_stay} nights</span>) <div class="sre-error" if="{dad.state.accommodation.needs_confirm}"> We will have to confirm the dates before your accommodation reservation is complete<br> </div> </div> </div> </div> <div class="sre-pad-l" if="{dad.state.has_billables}"> <div class="sre-bold"> Extra: </div> <div class="sre-pad-l" if="{!dad.tools.has_billables()}"> No extras selected </div> <div class="sre-pad-l" if="{dad.tools.has_billables()}"> <div class="sre-line" each="{billable in dad.conf.billables}" if="{billable.is_selected}"> <span class="sre-to-right sre-bold" if="{billable.type == \'Many\'}"> {dad.SRE.price(billable.price * billable.user_count)}&euro; </span> <span class="sre-to-right sre-bold" if="{billable.type != \'Many\'}"> {dad.SRE.price(billable.price)}&euro; </span> <span if="{billable.type == \'Many\'}">{billable.user_count} &times; </span> {billable.name} </div> </div> <div> <div> <span class="sre-to-right sre-text-right"> <br> <span class="sre-bold"> {dad.SRE.price(dad.state.final_price)}&euro;</span><br> </span> <span class="sre-bold"><br>TOTAL AMOUNT:</span> <span class="sre-gray" if="{dad.state.accommodation.needs_confirm}"> (Accommodation not included) </span> </div> </div> </div> <div class="sre-button-container" if="{dad.state.is_final_step}"> <div class="sre-button sre-info sre-to-right" onclick="{complete_registration}">INVOICE AND PAYMENT</div> <div class="sre-button sre-transparent sre-prev" onclick="{review_registration}">BACK</div> </div> </div> <div if="{dad.state.is_billing_visible}"> <div class="sre-line sre-text-center sre-big-font sre-bold">Billing Data</div> <p>Please fill in your Billing Data. Make sure this information is correct as it will show on the invoice you will receive.<br>&nbsp;</p> <div class="frm-item half"> <label>Bill to *</label> <input type="text" data-ref="bill_to" riot-value="{dad.postdata.user.title} {dad.postdata.user.firstname} {dad.postdata.user.lastname}" placeholder="Person name or company name"> </div> <div class="frm-item half"> <label>VAT Nr (if applicable)</label> <input type="text" data-ref="bill_vat" placeholder="eg: EL100108..." value=""> </div> <div class="frm-item half"> <label>Country *</label> <input type="text" data-ref="bill_country" placeholder="e.g. Greece, USA..." value=""> </div> <div class="frm-item half"> <label>City *</label> <input type="text" data-ref="bill_city" placeholder="eg: Amsterdam, Oslo..." value=""> </div> <div class="frm-item half"> <label>Address *</label> <input type="text" data-ref="bill_address" value="" placeholder="34 Freedom str."> </div> <div class="frm-item half"> <label>ZIP *</label> <input type="text" data-ref="bill_zip" value="" placeholder="71231"> </div> <div class="frm-item half"> <label>Phone (Incl. country code) *</label> <input type="tel" data-ref="bill_phone" riot-value="{dad.postdata.user.mobile}" placeholder="eg: 00306972001002"> </div> <div class="frm-item half"> <label>Email *</label> <input type="text" data-ref="bill_email" riot-value="{dad.postdata.user.email}" placeholder="eg: johndoe@example.com"> </div> <div class="frm-item" if="{dad.state.final_price}"> <label>Select Payment Method</label> <div if="{[\'cc\', \'bank\'].indexOf(payment_method) < 0}" class="sre-info"> Please select your prefered payment method by clicking on one of the options bellow. </div> <div class="toggler {\'selected\': payment_method == \'bank\'}" data-method="bank" onclick="{set_payment}" riot-style="background-image:url(\'{\'//\' + dad.SRE.SERVER + \'/img/check.png\'}\')"> Pay via bank transfer </div> <div class="toggler {\'selected\': payment_method == \'cc\'}" data-method="cc" onclick="{set_payment}" riot-style="background-image:url(\'{\'//\' + dad.SRE.SERVER + \'/img/check.png\'}\')"> Pay online using your credit card </div> </div> <div class="frm-item"> <div if="{payment_method == \'cc\'}" class="sre-info"> Please click on "<span class="sre-bold">PAY NOW</span>" and you will be transferred to the website of Eurobank to complete your registration. Upon successfull payment, an email will be sent to <span class="sre-bold">{dad.postdata.user.email}</span> with all the details of your registration.<br> <div class="sre-text-right"> <div data-ref="disable_button" class="sre-button sre-info" onclick="{pay_cc}">PAY NOW</div> <div data-ref="disable_text" style="display:none" class="sre-button sre-transparent">Please wait...</div> </div> </div> <div if="{payment_method == \'bank\'}" class="sre-info"> Please click on "<span class="sre-bold">REGISTER</span>" to submit your registration details. An email will be sent to <span class="sre-bold">{dad.postdata.user.email}</span> with all the details of your registration, a registration proforma and detailed instructions on how you can arrange the payment.<br> <br> Please note that your registration will be <span class="sre-bold">pending</span> until payment is received.<br> <div class="sre-text-right"> <div data-ref="disable_button" class="sre-button sre-info" onclick="{pay}">REGISTER</div> <div data-ref="disable_text" style="display:none" class="sre-button sre-transparent">Please wait...</div> </div> </div> </div> <div> <div data-ref="disable_button" if="{!dad.state.final_price}" class="sre-button sre-next sre-to-right" onclick="{inquire}">SEND INQUIRY</div> <div class="sre-button sre-prev sre-transparent" onclick="{summary}">BACK TO SUMMARY</div> <div if="{!dad.state.final_price}" data-ref="disable_text" style="display:none" class="sre-button sre-transparent">Please wait...</div> </div> </div> </div>', '', '', function(opts) {
		var tag = this;
		this.dad = this.parent;

		this.summary = function(event) {
			event.preventDefault();
			tag.dad.state.is_billing_visible = false;
		};

		this.complete_registration = function(event) {
			event.preventDefault();
			tag.dad.state.is_billing_visible = true;
		};

		this.review_registration = function(event) {
			event.preventDefault();
			event.preventUpdate = true;
			tag.dad.state.is_billing_visible = false;
			tag.dad.state.is_final_step = false;
			tag.dad.state.is_sum_visible = false;
			tag.dad.update();
		};

		this.pay = function(event) {
			event.preventDefault();
			tag.is_inquiry = 0;
			tag.refs.disable_button.style.display = 'none';
			tag.refs.disable_text.style.display = 'inline-block';
			tag.submit_form();
		};
		this.inquire = function(event) {
			event.preventDefault();
			tag.is_inquiry = 1;
			tag.payment_method = 'none';
			tag.refs.disable_button.style.display = 'none';
			tag.refs.disable_text.style.display = 'inline-block';
			tag.submit_form();
		};

		this.pay_cc = this.pay;

		this.set_payment = function(event) {
			event.preventDefault();
			tag.payment_method = event.target.getAttribute('data-method');
		};

		this.submit_form = function() {
			tag.check_form().then(tag.parent.pay).catch(function(msg){
				tag.refs.disable_button.style.display = 'inline-block';
				tag.refs.disable_text.style.display = 'none';

			});
		};

		this.check_form = function(event) {
			return new Promise(function(resolve, reject) {
				var has_error = false;
				['bill_to', 'bill_country', 'bill_city', 'bill_phone', 'bill_email', 'bill_address'].map(function(field) {
					var el = tag.refs[field];
					var val = el.value;
					if (val.length < 2) {
						tag.parent.helpers.create_error_for(el);
						has_error = true;
					}
				});

				if (has_error){
					reject('Please fill in all required fields.');
					return;
				}

				var em = tag.refs.bill_email;
				if (!tag.parent.SRE.utils.is_email(em.value)) {
					tag.parent.helpers.create_error_for(em);
					reject('Please use a valid email.');
					em.focus();
					return;
				}

				resolve({
					method: tag.payment_method,
					is_inquiry: tag.is_inquiry,
					bill_to: tag.refs.bill_to.value,
					bill_vat: tag.refs.bill_vat.value,
					bill_country: tag.refs.bill_country.value,
					bill_city: tag.refs.bill_city.value,
					bill_zip: tag.refs.bill_zip.value,
					bill_email: tag.refs.bill_email.value,
					bill_phone: tag.refs.bill_phone.value,
					bill_address: tag.refs.bill_address.value,
				});
			});
		};

});

riot.tag2('sre-syn', '<div class="sre-overlay" if="{state.is_visible}" onclick="{close}"> <div class="sre-popup" if="{conf === null}"> <div class="sre-pad-b sre-error">No conference</div> </div> <div class="sre-popup" if="{conf !== null}" show="{state.in_progress}"> <div class="sre-head"> <span class="sre-show-billing sre-rel" if="{state.step > 1 && !state.is_final_step}" onclick="{clicks.show_sum}"> Ξ <div class="sre-balloon onright" if="{!state.has_closed_registration_baloon}" onclick="{clicks.close_balloon}"> You can always click here to view your registration data<br><br> <a href="#" class="sre-und" onclick="{clicks.close_balloon}">Got it</a> </div> </span> <span class="sre-show-billing" if="{state.step == 1}" onclick="{close_now}">&times;</span> <div class="sre-title" if="{!state.is_final_step && !state.is_sum_visible}"> Step {state.step} of {state.steps.length}: <span class="sre-dimmed">{state.step_name}</span> </div> <div class="sre-title" if="{!state.is_final_step && state.is_sum_visible}"> <span class="sre-dimmed">Summary</span> </div> <div class="sre-title" if="{state.is_final_step && state.is_billing_visible}"> Step {state.steps.length} of {state.steps.length}: <span class="sre-dimmed">Payment</span> </div> <div class="sre-title" if="{state.is_final_step && !state.is_billing_visible}"> Step {state.steps.length} of {state.steps.length}: <span class="sre-dimmed">Payment</span> </div> </div> <div class="sre-main" show="{state.has_registration_result}"> <sre-registration-error if="{state.has_registration_result_error}"></sre-registration-error> <sre-registration-thanks if="{state.has_registration_result_thanks}" state="{state.registration_state}"></sre-registration-thanks> </div> <div class="sre-main" show="{!state.has_registration_result}"> <div class="sre-pad-b sre-contents" show="{!state.is_sum_visible}"> <div class="sre-step" data-ref="step1" show="{state.step_name == CONFERENCE_INFORMATION}"> <sre-syn-intro></sre-syn-intro> </div> <div class="sre-step" data-ref="step2" show="{state.step_name == TICKET_SELECTION}"> <div class="sre-contentss" show="{!state.cancelation_policy_visible && !state.w2_expect_visible}"> <p>Please select your registration type:</p> <div each="{mainticket in conf.tickets}"> <div class="sre-ticket-container {\'active\': (mainticket.id == state.selected_mainticket_id)}" onclick="{clicks.set_active_ticket}"> <div class="check" riot-style="background-image:url(\'{\'//\' + SRE.SERVER + \'/img/check.png\'}\')"></div> <div class="sre-bold">{mainticket.name}</div> <sre-raw txt="{mainticket.intro}"></sre-raw> <div class="sre-subticket" each="{ticket in mainticket.children}" if="{ticket.is_active}"> <p class="sre-bold"> <span class="sre-to-right" if="{mainticket.id == state.selected_mainticket_id}"> <span if="{ticket.variations && ticket.variations.length}"> <span if="{postdata.ticket.variation == null}"> From </span> {SRE.price(postdata.ticket.variation ? postdata.ticket.variation.price : ticket.price)}&euro; </span> <span if="{!ticket.variations || ticket.variations.length == 0}"> {SRE.price(ticket.price)}&euro; </span> </span> {ticket.name} </p> <div if="{mainticket.id == state.selected_mainticket_id}"> <div class="sre-pad-n" style="padding-left:0" if="{ticket.variations && ticket.variations.length}"> <p class="{state.variation_error ? \'sre-error\' : \'\'}">Please select type of registration:</p> <select onchange="{clicks.set_selected_variation(ticket.variations)}"> <option disabled selected>-- make a selection --</option> <option each="{variation, idx in ticket.variations}" riot-value="{idx}">{variation.name} ({variation.price} €)</option> </select> </div> <div class="sre-pad-n" style="padding-left:0" if="{mainticket.dropdowns && mainticket.dropdowns.length}" each="{dropdown in mainticket.dropdowns}"> <p class="{state.dropdown_error ? \'sre-error\' : \'\'}">{dropdown.user_text}</p> <select onchange="{clicks.select_dropdown_value(dropdown)}"> <option disabled selected>-- make a selection --</option> <option each="{opt in dropdown.user_options.split(\'|\')}" riot-value="{opt}">{opt}</option> </select> </div> </div> <div if="{mainticket.id == state.selected_mainticket_id}" class="sre-text-right"> <div if="{ticket.w2_expect && ticket.w2_expect.length > 2}" class="sre-button sre-transparent sre-underline" onclick="{clicks.show_w2_expect}">What\'s included</div> <div class="sre-button sre-next" onclick="{next_step}" if="{state.selected_mainticket_id}">NEXT</div> </div> </div> </div> </div> <p> <div class="sre-button sre-transparent sre-underline" onclick="{clicks.show_cancelation_policy}">Review Registration Cancelation Policy</div> </p> <div if="{conf.allow_guest}"> <div class="sre-button sre-transparent sre-underline" onclick="{clicks.set_no_ticket}">Click here if you have already registered</div> </div> <div class="sre-button-container"> <div class="sre-button sre-prev" onclick="{prev_step}">PREVIOUS</div> </div> </div> <div class="sre-contentss" if="{state.cancelation_policy_visible}"> <div class="sre-info-line sre-text-center">Registration Cancelation Policy</div> <div> <sre-raw txt="{conf.cancelation_policy}"></sre-raw> <div class="sre-button-container"> <div class="sre-button sre-close sre-to-right" onclick="{clicks.hide_cancelation_policy}">Close</div> </div> </div> </div> <div class="sre-contentss" if="{state.w2_expect_visible}"> <div class="sre-info-line sre-text-center">{state.selected_ticket.name} / What to expect</div> <div> <sre-raw txt="{state.selected_ticket.w2_expect}"></sre-raw> <div class="sre-button-container"> <div class="sre-button sre-close sre-to-right" onclick="{clicks.hide_w2_expect}">Close</div> </div> </div> </div> </div> <div class="sre-step" data-ref="step3" show="{state.step_name == EXTRA_OPTIONS}"> <syn-billables billables="{conf.billables}"></syn-billables> </div> <div class="sre-step" data-ref="step4" show="{state.step_name == ACCOMMODATION}"> <div class="sre-contentss"> <div if="{!state.show_hotel_details}" style="padding-bottom: 20px;"> <div class="info-message"> <span class="sre-i">i</span> <sre-raw txt="{conf.hotel_text}" style="color:#888"></sre-raw> </div> </div> <div class="sre-hotels" if="{!state.show_hotel_details}"> <div class="sre-ahotel" each="{hotel in conf.hotels}"> <div class="sre-hotel-title"> <span class="sre-hotel-title-name sre-bold"> {hotel.name} <span class="sre-hotel-title-stars"> <span each="{i in Array(parseInt(hotel.stars))}">*</span> </span> </span> <span class="sre-hotel-title-address">{hotel.address} - <a class="sre-und" href="#" onclick="window.open(\'https://www.google.com/maps?z=16&q={hotel.lat_lng}\');" target="_blank">Map</a></span> </div> <div class="sre-hotel-image sre-img-container"> <div> <img riot-src="//{SRE.SERVER + hotel.logo.value}" alt="{hotel.name}"> </div> </div> <div class="sre-hotel-data"> <div class=""><sre-raw txt="{hotel.intro}"></sre-raw></div> <div class="sre-text-right"> <div class="sre-button sre-next sre-info" onclick="{clicks.set_active_hotel}">SELECT THIS HOTEL</div> </div> </div> </div> </div> <div class="sre-hotel-details" if="{state.show_hotel_details}"> <div class="sre-bold"> <div class="sre-button sre-transparent sre-prev" onclick="{clicks.hide_hotel_details}">{state.accommodation.selected_hotel.name}</div> </div> <div class="sre-hotel-scroller"> <div if="{state.accommodation.selected_hotel_image}" class="sre-rel"> <a href="#" class="sre-rel-label" data-ref="thescroller" onclick="{clicks.hotel_scroll}">Scroll down to select room</a> <sre-carousel img="{state.accommodation.selected_hotel_image}" root="//{SRE.SERVER}" title="{state.accommodation.selected_hotel.name}" imgs="{state.accommodation.selected_hotel.elements}"></sre-carousel> </div> <div class="sre-pad-l"> <sre-raw txt="{state.accommodation.selected_hotel.intro}"></sre-raw> </div> <div class="sre-bold sre-text-center">Please select room</div> <div each="{room in state.accommodation.selected_hotel.rooms}" class="room-item {\'active\': (room.id == state.accommodation.selected_room.id)}" onclick="{clicks.set_active_room}" data-ref="the_room_{room.id}"> <div class="sre-bold">{room.name}</div> <div> <div> This room accommodates {room.max_pax} <span if="{room.max_extra_pax}"> + {room.max_extra_pax} extra</span> persons. From {SRE.price(room.price)}&euro; </div> </div> <div if="{room.id == state.accommodation.selected_room.id}"> <hr> <sre-raw txt="{room.intro}"></sre-raw> <div class="sre-pad-l" style="background:#fff; margin-bottom:10px" if="{room.max_extra_pax > 0}"> <div class="sre-bold">Extra Guests</div> <select style="display:block;" data-ref="extra_pax" onchange="{clicks.set_accommodation_guests}"> <option each="{pax, num_pax in Array(room.max_extra_pax+1)}" riot-value="{num_pax}">{num_pax ? num_pax : \'no extra guests\'}</option> </select> <div>You can select a max of {room.max_extra_pax} EXTRA guests.</div> </div> <div class="sre-bold"><br>Please select desired date for your stay: </div> <sre-user-daterange changehandler="{tools.select_accommodation_dates}" fromdate="{state.accommodation.date_from}" todate="{state.accommodation.date_to}"></sre-user-daterange> <div class="sre-error sre-small-font" if="{state.accommodation.needs_confirm}">We will have to confirm the dates before your accommodation reservation is complete.</div> <div class="info-message" if="{!state.accommodation.needs_confirm}"> <span class="sre-i">i</span> The conference dates have been preselected for you. <div if="{state.accommodation.selected_hotel.pivot.strict_dates != 1}">You are free to select a different date range if you want to check-in earlier or extend your stay.</div> <div if="{state.accommodation.selected_hotel.pivot.strict_dates == 1}">If you want to check-in earlier or extend your stay, we will have to confirm the dates for you.</div> </div> <div> <div class="sre-button sre-next sre-info sre-to-right" onclick="{clicks.show_hotel_disclaimer}">SELECT</div> <div class="sre-bold">Total {state.accommodation.total_stay} nights, {SRE.price(state.accommodation.price)}&euro;</div> </div> </div> </div> <div data-ref="hotel_scroller">&nbsp;</div> </div> </div> <div class="sre-hotel-disclaimer {\'active\': state.is_hotel_disclaimer_visible && !state.has_accepted_hotel_disclaimer}"> <div style="position: relative; overflow: auto; height: 100%; padding:0 20px"> <div class="sre-title sre-text-center sre-bold">{state.accommodation.selected_hotel.name} Cancelation Policy</div> <sre-raw txt="{conf.hotel_cancelation_policy}"></sre-raw> <div class="info-message"> <span class="sre-i">i</span>' + 
/*
As of January 1st, 2018, an additional Overnight Stay Tax applies, payable by the individual guest to accommodation in Greece and varies according to the official rating of the accommodation. <span class="sre-bold">{state.accommodation.selected_hotel.name}</span> is a {state.accommodation.selected_hotel.stars} stars hotel and the cost is <span class="sre-bold">{stars_cost[state.accommodation.selected_hotel.stars]}€ per room per night</span>.
*/
'As of January 1st, 2018, an additional Overnight Stay Tax applies, payable by the individual guest directly to the hotel accommodation in Greece. The cost per room per night varies according to the official rating of the accommodation' + 
'</div> <div class="info-message"> <span class="sre-i">i</span> In case you are sharing the room with another person, please provide his/her name; both names are required in order to make the hotel reservation </div> <div class="frm-item"> <br> <textarea data-ref="hotel_extra" value="" placeholder="Extra notes / requests regarding your accommodation, eg: Nutrition information, alergies..." style="width:100%"></textarea><br>&nbsp; </div> <div class="sre-button-container sre-disc-button-area"> <div class="sre-button sre-next sre-to-right" onclick="{clicks.accept_hotel_disclaimer}">I AGREE</div> <div class="sre-button sre-prev sre-transparent" onclick="{clicks.reject_hotel_disclaimer}">BACK</div> </div> </div> </div> </div> <div class="sre-button-container" if="{state.show_hotel_details == false}"> <div class="sre-button sre-transparent sre-to-right" onclick="{clicks.set_no_hotel}">SKIP</div> <div class="sre-button sre-prev" onclick="{prev_step}">PREVIOUS</div> </div> </div> <div class="sre-step" data-ref="step5" show="{state.step_name == PERSONAL_INFORMATION}"> <div if="{state.missing_data}" class="sre-text-center"> <p class="sre-title sre-bold">Missing data</p> <p>In order to continue, you will have to select an option from the previous steps.</p> <p>Please click on the PREVIOUS button bellow to review your options</p> </div> <div if="{!state.user_agree && !state.missing_data}"> <p> In order to continue with your registration, you need to provide your personal information. Please review the following, and indicate that you agree, by clicking the "I agree with all the above" button below </p> <ul> <li> All personal data collected via this service will be transferred to CCBS Greece and will be used solely for the purpose of organizing this event. Your information will be processed in accordance with the EU Data Protection laws. No outside parties have access to your personal information, and CCBS Greece will never share or sell your personal information to 3rd parties. </li> <li> Your data will be stored for a maximum of two years, and you can access your data or ask for full deletion of them by sending an email to <a href="mailto:gdpr@ccbsgreece.gr">gdpr@ccbsgreece.gr</a>. </li> <li> Should you have any concerns about the use of your personal information and you think that your personal information is used for purposes different from the above, you can raise a complaint to dpa.gr, the Greek Authority for the protection of Personal Information.<br>&nbsp; </li> </ul> <div class="i-agree"> <span class="button" onclick="{clicks.agree}">I Agree with all the above</span> </div> </div> <div if="{state.user_agree && !state.missing_data}" class="sre-contentss"> <p> Please provide your personal information. All fields with asterisk (*) are required. You will have to validate your email address in order to continue. </p> <div class="frm-item half"> <label>Title *</label> <input type="text" data-ref="title" value="" placeholder="Dr, Mr, Miss..."> </div> <div class="frm-item half"> <label>Gender </label> <div class="toggler {\'selected\': postdata.user.gender == \'Male\'}" onclick="{clicks.set_male}" riot-style="background-image:url(\'{\'//\' + SRE.SERVER + \'/img/check.png\'}\')"> Male </div> <div class="toggler {\'selected\': postdata.user.gender == \'Female\'}" onclick="{clicks.set_female}" riot-style="background-image:url(\'{\'//\' + SRE.SERVER + \'/img/check.png\'}\')"> Female </div> </div> <div class="frm-item half"> <label>First Name *</label> <input type="text" data-ref="firstname" value="" placeholder="eg: John"> </div> <div class="frm-item half"> <label>Last Name *</label> <input type="text" data-ref="lastname" value="" placeholder="eg: Doe"> </div> <div class="frm-item"> <label>Organization/Company *</label> <input type="text" data-ref="company" value="" placeholder="eg: University of Amsterdam, Demokritos Research Center"> </div> <div class="frm-item half"> <label>Mobile Phone (Incl. country code) *</label> <input type="tel" data-ref="mobile" placeholder="eg: 00306972001002" value="0030"> </div> <div class="frm-item half"> <label>Email *</label> <input data-ref="email" placeholder="eg: johndoe@example.com" oninput="{helpers.set_email_dirty}" type="email"> </div> <div class="frm-item" each="{extra in state.selected_ticket_extras}"> <label>{extra.value} *</label> <input data-ref="extra_field" data-key="{extra.key}" type="text" value="" placeholder="Required"> </div> </div> <div class="sre-info" if="{state.did_you_mean != \'\'}"> <span if="{state.email_resolved}">Your email appears to be valid, but maybe you misstyped it.</span> Did you mean: <a href="#" class="sre-und" onclick="{helpers.set_did_you_mean}">{state.did_you_mean}</a> </div> <div class="sre-info" if="{state.registration_error}"> {state.registration_error} </div> <div class="sre-button-container"> <div if="{!state.missing_data && !state.is_loading_email_data && state.user_agree && !state.email_resolved}" class="sre-button sre-next sre-to-right" onclick="{clicks.show_sum_final}">VALIDATE EMAIL </div> <div if="{state.is_loading_email_data && state.user_agree}" class="sre-button sre-transparent sre-to-right">Validating email... </div> <div if="{!state.is_loading_email_data && state.user_agree && state.email_resolved}" class="sre-button sre-next sre-to-right" onclick="{clicks.goto_last_step}">SUMMARY AND PAYMENT </div> <div class="sre-button sre-prev" onclick="{prev_step}">PREVIOUS</div> </div> </div> </div> <sre-syn-summary></sre-syn-summary> </div> </div> </div>', 'sre-syn *,[data-is="sre-syn"] *{font-size:16px; box-sizing:border-box;} sre-syn p,[data-is="sre-syn"] p{margin-bottom:3px; margin-top:3px; font-size:16px!important;} sre-syn .sre-overlay,[data-is="sre-syn"] .sre-overlay{z-index:1003; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,.4)} sre-syn .sre-popup,[data-is="sre-syn"] .sre-popup{position:fixed; top:0; left:0; right:0; height:100%; color:#333; background:#fff; overflow:auto} sre-syn .sre-pad-l,[data-is="sre-syn"] .sre-pad-l{padding:5px} sre-syn .sre-pad-n,[data-is="sre-syn"] .sre-pad-n{padding:5px} sre-syn .sre-pad-b,[data-is="sre-syn"] .sre-pad-b{padding:10px} sre-syn .sre-pad-bottom,[data-is="sre-syn"] .sre-pad-bottom{padding-bottom:20px} sre-syn .sre-bold,[data-is="sre-syn"] .sre-bold{font-weight:bold} sre-syn .sre-gray,[data-is="sre-syn"] .sre-gray,sre-syn .sre-grey,[data-is="sre-syn"] .sre-grey{color:#666;} sre-syn .sre-to-right,[data-is="sre-syn"] .sre-to-right{float:right;} sre-syn .sre-text-center,[data-is="sre-syn"] .sre-text-center{text-align:center;} sre-syn .sre-text-right,[data-is="sre-syn"] .sre-text-right{text-align:right;} sre-syn .sre-big-font,[data-is="sre-syn"] .sre-big-font{font-size:18px;} sre-syn .sre-small-font,[data-is="sre-syn"] .sre-small-font{font-size:14px;} sre-syn .sre-img-container img,[data-is="sre-syn"] .sre-img-container img{width:100%} sre-syn .sre-rel,[data-is="sre-syn"] .sre-rel{position:relative;} sre-syn .sre-rel-label,[data-is="sre-syn"] .sre-rel-label{position:absolute; font-size:14px; top:-10px; display:inline-block; padding:2px 20px; border-radius:5px; background:#f2c900; left:50%; transform:translateX(-50%); transition:.4s; text-decoration:none; z-index:3; top:-30px; min-width:200px; text-align:center; opacity:0} sre-syn .sre-rel-label.show,[data-is="sre-syn"] .sre-rel-label.show{top:20px; opacity:1} sre-syn .sre-und,[data-is="sre-syn"] .sre-und{text-decoration:underline;} sre-syn .sre-info,[data-is="sre-syn"] .sre-info{padding:5px; border:1px solid #fbe200; background:#fffcdf; font-size:14px;} sre-syn .sre-dimmed,[data-is="sre-syn"] .sre-dimmed{color:#fda;} sre-syn .info-message,[data-is="sre-syn"] .info-message{font-size:14px; position:relative; padding:10px 10px 10px 60px; background:#f3f3f3; border:1px solid #e6e6e6; margin:10px 0} sre-syn .info-message div,[data-is="sre-syn"] .info-message div,sre-syn .info-message p,[data-is="sre-syn"] .info-message p{font-size:14px!important} sre-syn .info-message .sre-i,[data-is="sre-syn"] .info-message .sre-i{display:block; width:40px; position:absolute; left:10px; top:10px; border:4px solid #ff9900; color:#ff9900; border-radius:50%; line-height:30px; font-size:26px; text-align:center; font-weight:bold; font-family:Monospace; } sre-syn .sre-main,[data-is="sre-syn"] .sre-main{position:relative;} sre-syn .sre-sum,[data-is="sre-syn"] .sre-sum{height:0; overflow:hidden; background:#fff; width:100%; border-bottom:1px solid #aaa; box-shadow:0 1px 5px #888; box-sizing:border-box;} sre-syn .sre-sum.visible,[data-is="sre-syn"] .sre-sum.visible{height:auto; padding:30px;} sre-syn .sre-line,[data-is="sre-syn"] .sre-line{border-bottom:1px solid #eee} sre-syn .sre-ahotel,[data-is="sre-syn"] .sre-ahotel{margin-bottom:10px; min-height:120px; background:#f3f3f3;;} sre-syn .room-item,[data-is="sre-syn"] .room-item{padding:20px; border:1px solid #ddd; background-color:#fff; cursor:pointer; margin-bottom:10px; position:relative; transition:.3s; opacity:.6} sre-syn .room-item:hover,[data-is="sre-syn"] .room-item:hover{border:1px solid #000;} sre-syn .room-item.active,[data-is="sre-syn"] .room-item.active{background-color:#eee; border:1px solid #000; opacity:1; cursor:auto!important;} sre-syn .room-item .check,[data-is="sre-syn"] .room-item .check{opacity:.5; transition:.4s; position:absolute; left:10px; width:50px; background-repeat:no-repeat; background-position:center; height:50px; background-size:contain} sre-syn .room-item.active .check,[data-is="sre-syn"] .room-item.active .check{opacity:1} sre-syn .sre-hotel-scroller,[data-is="sre-syn"] .sre-hotel-scroller{clear:both;} sre-syn .sre-hotel-logo,[data-is="sre-syn"] .sre-hotel-logo{max-height:80px; margin-right:10px; position:sticky; left:10px; top:10px; z-index:2; background:rgba(255,255,255,.2);} sre-syn .sre-hotel-disclaimer,[data-is="sre-syn"] .sre-hotel-disclaimer{position:absolute; bottom:0; left:0; right:0; height:0; background:#fff; z-index:3; transition:.3s; overflow:hidden;} sre-syn .sre-hotel-disclaimer.active,[data-is="sre-syn"] .sre-hotel-disclaimer.active{height:100%} sre-syn .sre-disc-button-area,[data-is="sre-syn"] .sre-disc-button-area{display:none} sre-syn .sre-hotel-disclaimer.active .sre-disc-button-area,[data-is="sre-syn"] .sre-hotel-disclaimer.active .sre-disc-button-area{left:0; right:0; padding-bottom:10px; position:fixed; bottom:0; display:block; background:#fff;} sre-syn .sre-billable,[data-is="sre-syn"] .sre-billable{padding:10px 10px 0 80px; border:1px solid #ddd; background-color:#fff; cursor:pointer; margin-bottom:10px; position:relative; transition:.3s; opacity:.6} sre-syn .sre-billable:hover,[data-is="sre-syn"] .sre-billable:hover{border:1px solid #000;} sre-syn .sre-billable.active,[data-is="sre-syn"] .sre-billable.active{background-color:#eee; border:1px solid #000; opacity:1; cursor:auto!important} sre-syn .sre-billable .check,[data-is="sre-syn"] .sre-billable .check{opacity:.5; transition:.4s; position:absolute; left:10px; width:50px; background-repeat:no-repeat; background-position:center; height:50px; background-size:contain} sre-syn .sre-billable.active .check,[data-is="sre-syn"] .sre-billable.active .check{opacity:1} sre-syn ul,[data-is="sre-syn"] ul{list-style:disc; margin:10px 0; padding:0 0 0 20px; list-style-position:outside} sre-syn li,[data-is="sre-syn"] li{margin:0 0 5px 0; display:list-item; text-align:-webkit-match-parent} sre-syn .i-agree,[data-is="sre-syn"] .i-agree{padding:20px 0; text-align:center;} sre-syn .i-agree .button,[data-is="sre-syn"] .i-agree .button{display:inline-block; margin:10px 0; padding:10px 20px; background:#50c7a0; color:#fff; font-weight: bold; cursor:pointer; border-radius:4px;} sre-syn .frm-item,[data-is="sre-syn"] .frm-item{margin-bottom:10px; display:block;} sre-syn .frm-item.half,[data-is="sre-syn"] .frm-item.half{width:49%; display:inline-block;} sre-syn .frm-item label,[data-is="sre-syn"] .frm-item label{display:block; color:#888; margin:0!important; font-weight:bold} sre-syn .frm-item input,[data-is="sre-syn"] .frm-item input,sre-syn .frm-item textarea,[data-is="sre-syn"] .frm-item textarea{outline:none!important; display:block; padding:0 0 5px 0; margin:0 10px 30px 0px; border:none; border-bottom:2px solid #ddd; width:100%} sre-syn .frm-item input.error,[data-is="sre-syn"] .frm-item input.error,sre-syn .frm-item textarea.error,[data-is="sre-syn"] .frm-item textarea.error{border-bottom:2px solid #f00!important;} sre-syn .frm-item textarea,[data-is="sre-syn"] .frm-item textarea{min-height:80px;} sre-syn .frm-item input:focus,[data-is="sre-syn"] .frm-item input:focus{border-bottom:2px solid #8ccfb9;} sre-syn .frm-item div.toggler,[data-is="sre-syn"] .frm-item div.toggler{background:transparent; opacity:.5; background-position:5px center; background-repeat:no-repeat; width:48%; margin:0 1% 12px 0; cursor:pointer; padding:10px 0 5px 30px; display:inline-block; background-size:20px; border-bottom:2px solid #aaa; box-sizing:border-box;} sre-syn .frm-item div.toggler:hover,[data-is="sre-syn"] .frm-item div.toggler:hover{border-bottom:2px solid #8ccfb9} sre-syn .frm-item div.toggler.selected,[data-is="sre-syn"] .frm-item div.toggler.selected{opacity:1; font-weight:bold; border-bottom:2px solid #8ccfb9} sre-syn div.sre-contents,[data-is="sre-syn"] div.sre-contents{max-height:90vh; overflow:auto; overflow-x:hidden;} sre-syn .sre-steps,[data-is="sre-syn"] .sre-steps{display:grid; grid-auto-columns:1fr;} sre-syn .sre-info-line,[data-is="sre-syn"] .sre-info-line{font-size:20px; font-weight:bold; } sre-syn .sre-astep,[data-is="sre-syn"] .sre-astep{grid-row:1; color:#000; text-align:center; border:1px solid #000; margin:5px 5px 0 5px; white-space:nowrap; border-bottom:none; border-radius:5px 5px 0 0; padding:5px 0; font-size:18px;} sre-syn .sre-astep.active,[data-is="sre-syn"] .sre-astep.active{background:#000; color:#fff; cursor:auto!important} sre-syn .sre-button-container,[data-is="sre-syn"] .sre-button-container{border-top:1px solid #eee; padding:20px 0 0 0; margin-top:20px;} sre-syn .sre-button,[data-is="sre-syn"] .sre-button{background-color:#50c7a0; color:#fff; display:inline-block; padding:0 20px; border-radius:2px; cursor:pointer; position:relative; margin:0 5px; min-height:36px; line-height:36px; } sre-syn .sre-button.disabled,[data-is="sre-syn"] .sre-button.disabled{background-color:#8ad0b9} sre-syn .sre-button.disabled:hover,[data-is="sre-syn"] .sre-button.disabled:hover{background-color:#8ad0b9} sre-syn .sre-button:hover,[data-is="sre-syn"] .sre-button:hover{background-color:#358269;} sre-syn .sre-button.sre-next,[data-is="sre-syn"] .sre-button.sre-next{padding-right:40px} sre-syn .sre-button.sre-prev,[data-is="sre-syn"] .sre-button.sre-prev{padding-left:40px} sre-syn .sre-button.sre-close,[data-is="sre-syn"] .sre-button.sre-close{padding-left:40px} sre-syn .sre-button.sre-info,[data-is="sre-syn"] .sre-button.sre-info{background-color:#03a9f4;} sre-syn .sre-button.sre-btn-error,[data-is="sre-syn"] .sre-button.sre-btn-error{background-color:#c75050;} sre-syn .sre-button.sre-info:hover,[data-is="sre-syn"] .sre-button.sre-info:hover{background-color:#0099e4;} sre-syn .sre-button.sre-transparent,[data-is="sre-syn"] .sre-button.sre-transparent{background-color:transparent!important; color:#333!important; padding-left:15px!important; padding-right:15px!important} sre-syn .sre-button.sre-underline,[data-is="sre-syn"] .sre-button.sre-underline{text-decoration:underline;} sre-syn .sre-button.sre-prev,[data-is="sre-syn"] .sre-button.sre-prev{padding-left:40px} sre-syn .sre-button.sre-next.sre-transparent:after,[data-is="sre-syn"] .sre-button.sre-next.sre-transparent:after{border-color:#444!important; right:0!important;} sre-syn .sre-button.sre-prev.sre-transparent:after,[data-is="sre-syn"] .sre-button.sre-prev.sre-transparent:after{border-color:#444!important; left:0!important;} sre-syn .sre-button.sre-next:after,[data-is="sre-syn"] .sre-button.sre-next:after{position:absolute; right:15px; top:12px; width:8px; height:8px; transform:rotate(45deg); border-right:2px solid #fff; border-top:2px solid #fff; content:" "; display:block;} sre-syn .sre-button.sre-prev:after,[data-is="sre-syn"] .sre-button.sre-prev:after{position:absolute; left:15px; top:12px; width:8px; height:8px; transform:rotate(-135deg); border-right:2px solid #fff; border-top:2px solid #fff; content:" "; display:block;} sre-syn .sre-button.sre-close:after,[data-is="sre-syn"] .sre-button.sre-close:after{position:absolute; left:14px; top:-2px; width:30px; height:30px; font-size:24px; content:"×"; display:block; } sre-syn .sre-error,[data-is="sre-syn"] .sre-error{color:#f00;} sre-syn .sre-head,[data-is="sre-syn"] .sre-head{background:#000; color:#fff; height:40px; position:relative;} sre-syn .sre-title,[data-is="sre-syn"] .sre-title{text-align:center;padding:12px 0;} sre-syn .sre-show-billing,[data-is="sre-syn"] .sre-show-billing{position:absolute; right:0; width:40px; height:40px; border-left:1px solid #fff; background:#358269; display:inline-block; text-align:center; line-height:40px; cursor:pointer;} sre-syn .sre-balloon,[data-is="sre-syn"] .sre-balloon{position:absolute; padding:10px; width:220px; background:#fffcdf; z-index:111; right:3px; top:50px; line-height:1.4em; font-size:14px;; color:#000; box-shadow:0 0 30px #000; border-radius:10px} sre-syn .sre-balloon.for-hotel,[data-is="sre-syn"] .sre-balloon.for-hotel{right:initial; left:5px; top:60px;} sre-syn .sre-balloon.onright:before,[data-is="sre-syn"] .sre-balloon.onright:before{content:" "; transform:rotate(45deg); background:#fffcdf; top:-9px; right:8px; width:20px; height:20px; display:inline-block; position:absolute; box} sre-syn .sre-balloon.onleft:before,[data-is="sre-syn"] .sre-balloon.onleft:before{content:" "; transform:rotate(45deg); background:#fffcdf; top:-9px; left:18px; width:20px; height:20px; display:inline-block; position:absolute; box} sre-syn .sre-ticket-container,[data-is="sre-syn"] .sre-ticket-container{padding:10px 10px 10px 80px; border:1px solid #eee; background-color:#fff; cursor:pointer; margin-bottom:10px; position:relative; transition:.3s; opacity:.6} sre-syn .sre-ticket-container:hover,[data-is="sre-syn"] .sre-ticket-container:hover{border:1px solid #000;} sre-syn .sre-ticket-container.active,[data-is="sre-syn"] .sre-ticket-container.active{background-color:#eee; border:1px solid #000; opacity:1; cursor:auto!important} sre-syn .sre-ticket-container .check,[data-is="sre-syn"] .sre-ticket-container .check{opacity:.5; transition:.4s; position:absolute; left:10px; width:50px; background-repeat:no-repeat; background-position:center; height:50px; background-size:contain} sre-syn .sre-ticket-container.active .check,[data-is="sre-syn"] .sre-ticket-container.active .check{opacity:1} sre-syn .sre-hotel-title,[data-is="sre-syn"] .sre-hotel-title{background:#eee; padding:5px} @media screen and (max-width:560px) { sre-syn .sre-show-desktop,[data-is="sre-syn"] .sre-show-desktop{display:none} sre-syn .sre-hotel-title-address,[data-is="sre-syn"] .sre-hotel-title-address{} sre-syn .sre-hotel-title-name,[data-is="sre-syn"] .sre-hotel-title-name{display:block} sre-syn .sre-hotel-title-stars,[data-is="sre-syn"] .sre-hotel-title-stars{} sre-syn .sre-ahotel .sre-hotel-data,[data-is="sre-syn"] .sre-ahotel .sre-hotel-data{padding:5px 5px 10px 5px;} } @media screen and (min-width:561px) { sre-syn .sre-ahotel .sre-hotel-image,[data-is="sre-syn"] .sre-ahotel .sre-hotel-image{width:17%; margin:0 2% 1% 0; display:inline-block; vertical-align:top} sre-syn .sre-ahotel .sre-hotel-data,[data-is="sre-syn"] .sre-ahotel .sre-hotel-data{width:80%; display:inline-block; vertical-align:top; margin:10px 0} sre-syn .sre-show-mobile,[data-is="sre-syn"] .sre-show-mobile{display:none} sre-syn .sre-hotel-title-address,[data-is="sre-syn"] .sre-hotel-title-address{float:right;} sre-syn .sre-popup,[data-is="sre-syn"] .sre-popup{top:4vh; left:50%; transform:translateX(-50%); width:90vw; max-width:960px; height:auto; max-height:95vh;} sre-syn .sre-pad-l,[data-is="sre-syn"] .sre-pad-l{padding:10px} sre-syn .sre-pad-n,[data-is="sre-syn"] .sre-pad-n{padding:20px} sre-syn .sre-pad-b,[data-is="sre-syn"] .sre-pad-b{padding:30px} }', '', function(opts) {

	this.test_string = 'test';
	var tag = this;
	this.CONFERENCE_INFORMATION = 'Conference information';
	this.TICKET_SELECTION = 'Registration';
	this.EXTRA_OPTIONS = 'Extra Options';
	this.ACCOMMODATION = 'Accommodation';
	this.PERSONAL_INFORMATION = 'Personal Information';

	this.SRE = this.opts.SRE;
	this.conf = null;

	this.stars_cost = {
		"3": 1.5,
		"4": 3,
		"5": 4
	};

	this.postdata = {
		user: {gender:''},
		billables: [],
		ticket: {
			ticket_id: 0,
			mainticket_id: 0,
			extra: {},
			variation: null,
			dropdowns: {}
		},
		accommodation: {
			hotel_id:0,
			room_id: 0,
			extra_pax: 0,
			date_from: null,
			date_to: null,
		}
	};

	this.state = {
		final_price: 0,
		cancelation_policy_visible: false,
		w2_expect_visible: false,
		is_guest: 0,
		has_registration_result: false,
		has_registration_result_error: false,
		has_accepted_hotel_disclaimer: false,
		registration_error: null,
		is_loading_email_data: false,
		email_resolved: false,
		did_you_mean: '',
		total_billable_price:0,
		in_progress: true,

		is_final_step: false,
		has_closed_hotel_baloon: false,
		has_closed_registration_baloon: false,
		user_agree: false,
		accommodation: {
			inquire: 0,
			needs_confirm: 0,
			selected_hotel: {},
			selected_room: {},
			room_max_pax: 0,
			room_max_extra_pax: 0,
			room_price: 0,
			room_extra_price: 0,
			price: 0,
		},
		variation: null,
		variation_error: false,
		dropdown_error: false,
		is_visible: false,
		is_sum_visible:false,
		is_billing_visible: false,
		is_hotel_disclaimer_visible: false,
		step: 1,
		steps: [
			'',
			tag.CONFERENCE_INFORMATION,
			tag.TICKET_SELECTION,
			tag.EXTRA_OPTIONS,
			tag.ACCOMMODATION,
			tag.PERSONAL_INFORMATION,
		],
		has_hotels: false,
		has_billables: false,
		selected_mainticket_id: 0,
		selected_mainticket_dropdowns: [],
		selected_ticket_id: 0,
		show_hotel_details: false,
	};

	this.tools = {
		select_accommodation_dates: function(dates){
			tag.state.accommodation.date_from = dates[0];
			tag.state.accommodation.date_to = dates[1];
			tag.state.accommodation.total_stay = tag.SRE.date.days_diff(tag.state.accommodation.date_from, tag.state.accommodation.date_to);
			tag.tools.calculate_accommodation_price();
			tag.state.has_closed_hotel_baloon = true;
			tag.update();
		},
		calculate_accommodation_price: function(){
			tag.state.accommodation.price = tag.state.accommodation.total_stay * (
				parseFloat(tag.state.accommodation.selected_room.price) +
				parseFloat(tag.state.accommodation.selected_room.extra_pax_price * tag.state.accommodation.selected_extra_pax)
			);
			var conf_from = new Date(tag.conf.date_from.split('-').join('/'));
			var conf_to = new Date(tag.conf.date_to.split('-').join('/'));

			tag.state.accommodation.needs_confirm =
				tag.state.accommodation.selected_hotel &&
				tag.state.accommodation.selected_hotel.pivot &&
				tag.state.accommodation.selected_hotel.pivot.strict_dates &&
				(conf_from > tag.state.accommodation.date_from || conf_to < tag.state.accommodation.date_to) ? 1 : 0;
		},
		has_billables: function(){
			return tag.conf.billables.filter(function(billable){
				return billable.is_selected;
			}).length;
		},
		get_hotel_image: function(hotel) {
			if (!hotel.elements) {
				return null;
			}

			var img = hotel.elements.filter(function(element) {
				return element.key == 'image';
			});

			return img.length ?
				img[0].value :
				null;
		},
	};

	this.clicks = {
		select_dropdown_value: function(dropdown) {
			return function (event) {
				event.preventDefault();
				tag.postdata.ticket.dropdowns[dropdown.admin_name] = event.target.value.trim();
			};
		},
		set_selected_variation: function(variations) {
			return function (event) {
				event.preventDefault();
				tag.state.variation_error = false;
				tag.state.dropdown_error = false;
				tag.postdata.ticket.variation = variations[event.target.value];
				tag.state.selected_ticket_price = variations[event.target.value].price;
			};
		},
		show_cancelation_policy: function(event)  {
			event.preventDefault();
			tag.state.cancelation_policy_visible = true;
		},
		hide_cancelation_policy: function(event)  {
			event.preventDefault();
			tag.state.cancelation_policy_visible = false;
		},
		show_w2_expect: function(event)  {
			event.preventDefault();
			tag.state.w2_expect_visible = true;
		},
		hide_w2_expect: function(event)  {
			event.preventDefault();
			tag.state.w2_expect_visible = false;
		},

		close_balloon: function(event) {
			event.preventDefault();
			event.stopPropagation();
			tag.state.has_closed_registration_baloon = true;
		},
		cancel_click: function(event){
			event.preventDefault();
			event.stopPropagation();
		},
		set_active_ticket: function(event) {
			event.preventDefault();
			var active = event.item.mainticket.children.filter(function(tt) {
				return tt.is_active == true;
			});
			if (active.length && active[0].variations && active[0].variations.length > 0) {
				tag.state.has_variations = true;
			} else {
				tag.state.has_variations = false;
			}
			tag.do_set_active_ticket(event.item.mainticket);
		},
		set_active_hotel: function(event) {
			event.preventDefault();
			tag.state.accommodation.selected_hotel = event.item.hotel;
			tag.state.accommodation.selected_hotel_image = tag.tools.get_hotel_image(tag.state.accommodation.selected_hotel);
			tag.state.show_hotel_details = true;
			setTimeout(function(){
				tag.refs.thescroller.className = 'sre-rel-label show';
			}, 100);
			setTimeout(function(){
				tag.refs.thescroller.className = 'sre-rel-label';
			}, 2100);
		},
		hide_hotel_details: function(event) {

			event.preventDefault();
			tag.state.show_hotel_details = false;
		},
		set_active_room: function(event) {
			event.preventDefault();
			if (event.item.room == tag.state.accommodation.selected_room){
				event.preventUpdate = true;
				return;
			}
			var room = event.item.room;
			if (!tag.state.accommodation.date_from){
				tag.state.accommodation.date_from = SRE.date.date_object_from_string(tag.conf.date_from);
				tag.state.accommodation.date_to = SRE.date.date_object_from_string(tag.conf.date_to);
				tag.state.accommodation.total_stay = tag.SRE.date.days_diff(tag.state.accommodation.date_from, tag.state.accommodation.date_to);
			}
			tag.state.accommodation.selected_room = room;
			tag.state.accommodation.selected_extra_pax = tag.state.accommodation.selected_extra_pax || 0;
			tag.tools.calculate_accommodation_price();
			setTimeout(function(){
				tag.refs['the_room_' + room.id].scrollIntoView({
					behavior: 'smooth'
				});
			}, 10);
		},
		set_no_hotel: function(event) {
			event.preventDefault();
			tag.state.accommodation.selected_hotel = {};
			tag.state.accommodation.selected_room = {};
			tag.state.accommodation.selected_extra_pax = 0;
			tag.state.accommodation.price = 0;
			tag.next_step(null);
		},

		set_accommodation_guests: function(event){
			tag.state.accommodation.selected_extra_pax = event.target.value;
			tag.tools.calculate_accommodation_price();
		},
		hotel_scroll: function(event) {
			tag.refs.hotel_scroller.scrollIntoView({
				behavior: 'smooth'
			});
		},
		show_hotel_disclaimer: function(event) {
			event.preventDefault();
			if (tag.state.has_accepted_hotel_disclaimer){
				tag.next_step();
				return;
			}
			tag.state.is_hotel_disclaimer_visible = true;
			setTimeout(function() {
				tag.refs.hotel_extra.focus();
			}, 400);
		},
		accept_hotel_disclaimer: function(event) {
			event.preventDefault();
			tag.state.accommodation.extra = tag.refs.hotel_extra.value;
			tag.state.is_hotel_disclaimer_visible = false;
			tag.state.has_accepted_hotel_disclaimer = true;
			tag.next_step();
		},
		reject_hotel_disclaimer: function(event) {
			event.preventDefault();
			tag.state.is_hotel_disclaimer_visible = false;
		},

		set_no_ticket: function(event) {
			event.preventDefault();
			tag.state.is_guest = 1;
			tag.state.selected_ticket_id = 0;
			tag.state.selected_ticket_name = '';
			tag.state.selected_mainticket_name = '';
			tag.state.selected_ticket_price = 0;
			tag.helpers.calculate_extras_total();
			tag.next_step(null);
		},
		show_sum: function(event){
			event.preventDefault();
			tag.state.is_sum_visible = !tag.state.is_sum_visible;
		},
		show_sum_final: function(event){
			event.preventDefault();
			tag.state.registration_error = null;
			tag.helpers.check_form()
				.then(function($res) {
					tag.state.is_loading_email_data = false;
					if (tag.state.email_resolved && tag.state.did_you_mean == '') {
						tag.helpers.update_user_data();
						tag.state.is_sum_visible = !tag.state.is_sum_visible;
						tag.state.is_final_step = true;
					}
					tag.update();
				})
				.catch(function(err) {
					dd(err);
					tag.state.registration_error = err;
					tag.update();

				});
			return;
		},
		goto_last_step: function(event) {
			event.preventDefault();
			tag.helpers.update_user_data();
			tag.state.is_sum_visible = !tag.state.is_sum_visible;
			tag.state.is_final_step = true;
		},

		agree: function(event) {
			tag.state.user_agree = true;
			setTimeout(function() {
				tag.refs.title.focus();
			});
		},
		set_male: function(event) {
			tag.postdata.user.gender = tag.postdata.user.gender == 'Male' ? '' : 'Male';
		},
		set_female: function(event) {
			tag.postdata.user.gender = tag.postdata.user.gender == 'Female' ? '' : 'Female';
		},
	};

	this.to_step = function(event) {
		event.preventDefault();
		var tostep = event.currentTarget.getAttribute('data-step');
		tag.set_step(tostep);
	};
	this.set_step = function(stepid) {
		tag.state.step = Number(stepid);
		tag.state.step_name = tag.state.steps[stepid];
		setTimeout(function() {
			tag.trigger('step-changed');
			tag.update();
		});
	};
	this.prev_step = function(event) {
		if (event) {
			event.preventDefault();
		}

		if (tag.state.step == 3 && !tag.state.has_tickets) {
			tag.set_step(tag.state.step-2);
		} else {
			tag.set_step(tag.state.step-1);
		}
	};
	this.next_step = function(event) {

		if (event) {
			event.preventDefault();
			event.preventUpdate = true;
		}

		if (tag.state.step == 1){
			if (!tag.state.has_tickets) {
				tag.set_step(tag.state.step+2);
				return;
			}

		}
		if (tag.state.step == 2) {
			var has_error = false;
			if (tag.state.has_variations && tag.postdata.ticket.variation == null) {
				tag.state.variation_error = true;
				has_error = true;
			}
			var drop_count = tag.state.selected_mainticket_dropdowns.length;
dd(drop_count, tag.postdata.ticket.dropdowns);

			if (drop_count && Object.keys(tag.postdata.ticket.dropdowns).length != drop_count) {
				tag.state.dropdown_error = true;
				has_error = true;
			}

			if (has_error) {
				tag.update();
				return;
			}
		}
		tag.set_step(tag.state.step + 1);
	};

	this.close_now = function(event) {
		event.preventDefault();
		event.stopPropagation();
		tag.state.is_visible = false;
	};

	this.on('update', function(){
		tag.state.final_price = parseFloat(
			parseFloat(tag.state.selected_ticket_price || 0) +
			parseFloat(tag.state.accommodation.needs_confirm ? 0 : (tag.state.accommodation.price || 0)) +
			parseFloat(tag.state.total_billable_price || 0)
		, 2);

		tag.state.missing_data = (tag.conf.allowZeroCost || parseFloat(tag.state.final_price) || tag.state.accommodation.needs_confirm) ? 0 : 1;
	//	console.log(tag.state.final_price, tag.state.accommodation.needs_confirm, tag.state.missing_data);
	});

	this.close = function(event) {
		event.preventDefault();
		if (tag.conf){
			event.preventUpdate = true;
			return;
		}
		tag.state.is_visible = false;
	};

	this.SRE.app.on('show', function() {
		qwest.get('//' + tag.SRE.SERVER + '/api/1.0/transactions/' + tag.SRE.app.conference_id + '/full')
			.then(function(h, data) {
				var r = data.data;

				r.billables.map(function(billable){
					billable.is_selected = billable.is_preselected;
					billable.user_count = billable.is_preselected ?
						(billable.default_count ? billable.default_count : 1) :
						1;
				});
				tag.original_conference = JSON.parse(JSON.stringify(r));
				r.hotels = r.hotels.filter(function(h) {
					return h.pivot.is_active == 1;
				});

				tag.state.has_hotels = r.hotels && r.hotels.length > 0;
				tag.state.has_tickets = r.tickets && r.tickets.length > 0;
				tag.state.has_billables = r.billables && r.billables.length > 0;
				tag.state.is_visible = true;

				tag.conf = tag.helpers.parse_synedrio(r);

				var df = new Date(tag.conf.date_from.split('-').join('/'));
				var dt = new Date(tag.conf.date_to.split('-').join('/'));
				tag.tools.select_accommodation_dates([df, dt]);

				if (!tag.state.has_billables){
					tag.state.steps.splice(3,1);
					if (!tag.state.has_hotels){
						tag.state.steps.splice(3,1);
					}
				}else{
					if (!tag.state.has_hotels){
						tag.state.steps.splice(4,1);
					}
				}
				tag.set_step(tag.state.step);

				tag.update();
			})
			.catch(function(a,res){
				if (res.status == 404){
					tag.conf = null;
					alert('Registration for this conference is not available anymore!');
					return;
				}
				tag.update();
			});
	});

	this.helpers = {
		parse_synedrio: function (sin) {
			var error = false;
			sin.tickets.map(function (ticket) {
				var found = 0;
				ticket.children.map(function (kid){
					var now = new Date();
					var df = tag.helpers.date(kid.date_from);
					var dt = tag.helpers.date(kid.date_to);
					dt.setDate(dt.getDate() + 1);

					kid.is_active = df <= now && now <= dt;
					if (kid.is_active){
						found++;
					}
				});
				error = error || (found > 1);
			});

			if (error){
				alert('An error occured. Conflicting dates!');
				return null;
			}
			return sin;
		},
		date: function(dt){
			return tag.SRE.date.date_object_from_string(dt);
		},
		update_user_data: function() {
			['title', 'firstname', 'lastname', 'company', 'mobile', 'email'].map(function(field) {
				tag.postdata.user[field] = tag.refs[field].value;
			});

			tag.postdata.billables = tag.conf.billables.reduce(function(acc,b) {
				if (b.is_selected){
					var hasEF = (b.extrafields != '' && b.extrafields != null);
					acc.push({
						id: b.id,
						nr: +b.user_count,
						extra: hasEF ? b.extrafields.map(function(ef) {
							return {
								'key': ef.class,
								'value': ef.value
							};
						}) : {}
					});
				}
				return acc;
			}, []);

			tag.postdata.ticket.ticket_id = tag.state.selected_ticket_id;
			tag.postdata.ticket.mainticket_id = tag.state.selected_mainticket_id;
			tag.postdata.ticket.extra = {};

			tag.postdata.accommodation = {
				hotel_id: tag.state.accommodation.selected_hotel.id,
				room_id: tag.state.accommodation.selected_room.id,
				extra_pax: tag.state.accommodation.selected_extra_pax,
				date_from: tag.state.accommodation.date_from ? tag.SRE.date.ymd_from_object(tag.state.accommodation.date_from) : '',
				date_to: tag.state.accommodation.date_to ? tag.SRE.date.ymd_from_object(tag.state.accommodation.date_to) : '',
				extra: tag.state.accommodation.extra
			};

			if (!tag.refs.extra_field) {
				return;
			}
			var rrs;
            if (!Array.isArray(tag.refs.extra_field)) {
                rrs = [tag.refs.extra_field];
            }else{
                rrs = tag.refs.extra_field;
            }
			rrs.map(function(aField) {
				var k = aField.getAttribute('data-key');
				tag.postdata.ticket.extra[k] = aField.value;
			});
		},
		calculate_extras_total: function() {
			tag.state.total_billable_price = tag.conf.billables.reduce(function(acc, blbl) {
				acc += blbl.is_selected ? blbl.user_count*Number(blbl.price) : 0;
				return acc;
			}, 0);
		},
		check_form: function() {
			return new Promise(function(resolve, reject) {
				var has_error = false;
				['title', 'firstname', 'lastname', 'company', 'mobile', 'email'].map(function(field) {
					var el = tag.refs[field];
					if (el.value.length < 2) {
						tag.helpers.create_error_for(el);
						has_error = true;
					}
				});

				if (tag.refs.extra_field) {
					var rrs;
					if (!Array.isArray(tag.refs.extra_field)) {
						rrs = [tag.refs.extra_field];
					}else{
						rrs = tag.refs.extra_field;
					}

					rrs.map(function(aField) {
						if (aField.value.length < 2) {
							tag.helpers.create_error_for(aField);
							has_error = true;
						}
					});
				}

				if (has_error){
					reject('Please fill in all required fields.');
					return;
				}

				var em = tag.refs.email;
				if (!tag.SRE.utils.is_email(em.value)) {
					tag.helpers.create_error_for(em);
					em.focus();
					reject('Please use a valid email.');
					return;
				}
				tag.state.is_loading_email_data = true;
				return tag.helpers.ajax_check_email(em.value, resolve, reject);
			});
		},
		create_error_for: function(element) {
			element.className += 'error';
			element.addEventListener('focus', tag.helpers.focus_error_handler);
		},
		focus_error_handler: function(event){
			setTimeout(function(){
				event.srcElement.className = event.srcElement.className.replace('error', '');
				event.srcElement.removeEventListener('focus', tag.helpers.focus_error_handler);
			}, 500);
		},
		ajax_check_email: function(email, resolve, reject) {
			return qwest.post('//' + tag.SRE.SERVER + '/api/1.0/transactions/' + tag.SRE.app.conference_id + '/email_exists', {
				email: email
			})
			.then(function(h, data) {
				var r = data.data;

				if (r.result != 'valid') {
					tag.state.email_resolved = false;
					tag.state.is_loading_email_data = false;
					tag.update();
					reject('This email does not appear to be valid. Make sure you typed it correctly and then click on VALIDATE EMAIL.');
					return;
				}

				tag.state.email_resolved = true;
				tag.state.did_you_mean = r.did_you_mean;

				resolve(true);
			}).catch(reject);
		},
		set_email_dirty: function(event) {
			tag.state.email_resolved = false;
			tag.state.did_you_mean = '';
			tag.state.registration_error = null;
		},
		set_did_you_mean: function(event) {
			event.preventDefault();
			tag.refs.email.value = tag.state.did_you_mean;
			tag.state.did_you_mean = '';
			tag.state.email_resolved = false;
		},
		reset_registration_message: function() {
			tag.state.has_registration_result = false;
			tag.state.has_registration_result_error = false;
			tag.update();
		}
	};

this.do_set_active_ticket = function(ticket) {
    if (tag.state.selected_mainticket_id == ticket.id) return;
    var mainticket = tag.conf.tickets.reduce(function(aticket, mt){
        if (mt.id == ticket.id){
            aticket = mt;
        }
        return aticket;
    }, null);
    var selectedTicket = mainticket.children.filter(function(aticket) {
        return aticket.is_active;
    })[0];
    if (!selectedTicket) {
        alert('This option is not available anymore!');
        return;
    }
    tag.state.selected_ticket = selectedTicket;
    tag.postdata.ticket.variation = null;
    tag.postdata.ticket.dropdowns = {};
    tag.state.selected_mainticket_id = ticket.id;
    tag.state.selected_mainticket_dropdowns = ticket.dropdowns || [];


    tag.state.selected_ticket_id = tag.state.selected_ticket.id;
    tag.state.selected_ticket_name = tag.state.selected_ticket.name;
    tag.state.selected_mainticket_name = mainticket.name ;
    tag.state.selected_ticket_price = tag.state.selected_ticket.price;
    tag.state.selected_ticket_extras = mainticket.extra_fields ? mainticket.extra_fields : [];
};
	this.pay = function(billing_data) {
		tag.postdata.billing = billing_data;
		return qwest.post('//' + tag.SRE.SERVER + '/api/1.0/transactions/' + tag.SRE.app.conference_id + '/book', tag.postdata)
			.then(function (xhr, result) {
				if (result.error) {
					tag.show_error(result.error_messages);
					return;
				}
				tag.show_thanks(result.data);
			}).catch(function(error) {
				tag.show_error([{
					entity: 'Generic Error',
					message: error
				}]);
			});
	};

	this.on_mount = function(){

		tag.date_now = new Date();

	};
	this.on('mount', tag.on_mount);

	this.show_thanks = function(result) {
		tag.state.has_registration_result = true;
		tag.state.has_registration_result_error = false;
		tag.state.has_registration_result_thanks = true;

		tag.state.registration_state = {
			payment_method: result.payment_method,
			amount: result.amount,
			refid: result.refid,
			fullname: result.fullname,
			email: result.email
		};

		tag.state.error = null;
		tag.update();
	};

	this.show_error = function(error_messages) {
		tag.state.has_registration_result = true;
		tag.state.has_registration_result_error = true;
		tag.state.has_registration_result_thanks = false;
		tag.state.error = error_messages;
		tag.update();
	};

});
riot.tag2('sre-user-daterange', '<div if="{!state.api_loaded}"> Please wait... loading api </div> <div class="input-field dt-container"> <input type="text" data-ref="range" class="daterange" placeholder="Click to select date"> </div>', 'sre-user-daterange input[type="text"],[data-is="sre-user-daterange"] input[type="text"]{border:none; border-bottom:1px solid #aaa; outline:none!important; padding:0; margin:10px 0; display:block; width:100%; padding:5px;}', '', function(opts) {


		this.SRE = this.parent.SRE || null;

		var tag = this;

		this.state = {
			api_loaded: false,
			range_from: this.SRE.date.date_object_from_string(this.opts.fromdate || ''),
			range_to: this.SRE.date.date_object_from_string(this.opts.todate || ''),
			format: this.opts.format || 'Y-m-d',
		};

		var now = new Date();
		now.setDate(now.getDate() + 1);

		this.state.min_date = this.opts.mindate ?
			this.opts.mindate :
			this.SRE.date.ymd_from_object(now);

		this.state.max_date = this.opts.maxdate ? this.opts.maxdate : null;

		this.show_control = function() {
			tag.state.api_loaded = true;
			tag.update();

			tag.picker = flatpickr(tag.refs.range, {
				dateFormat: tag.state.format,
				altFormat: 'd/m/Y',
				altInput: true,
				mode: "range",
				minDate: tag.state.min_date,
				maxDate: tag.state.max_date,
				defaultDate: [tag.state.range_from, tag.state.range_to],
				onChange: tag.range_changed,
			});
		};

		this.range_changed = function(selectedDates, dateStr, instance) {
			if (selectedDates.length == 2){
				tag.state.range_from = selectedDates[0];
				tag.state.range_to = selectedDates[1];
				tag.opts.changehandler(selectedDates);
			}
		};

		this.load_api = function() {
			return tag.SRE.load_script('//cdn.jsdelivr.net/npm/flatpickr').then(function() {
				return tag.SRE.load_css('//cdn.jsdelivr.net/npm/flatpickr/dist/themes/material_green.min.css');
			}).catch(function() {
				alert('an error occured');
			});
		};

		this.on_mount = function() {
			tag.load_api().then(tag.show_control);
		};

		this.before_unmount = function() {
		};

		this.on('mount', this.on_mount);
		this.on('before-unmount', this.before_unmount);
});

riot.tag2('syn-billables', '<div class="sre-contentss"> <p>Please select any of the extra options you would like to be added to your registration, and click "Next" to continue</p> <div class="sre-billable {\'active\': billable.is_selected}" each="{billable, billable_index in opts.billables}" onclick="{clicks.toggle_billable}"> <div class="check" onclick="{clicks.toggle_billable}" data-check="1" riot-style="background-image:url(\'{\'//\' + dad.SRE.SERVER + \'/img/check.png\'}\')"></div> <div class="sre-bold">{billable.name}</div> <sre-raw txt="{billable.intro}"></sre-raw> <div class="sre-text-right sre-pad-l" if="{!billable.is_selected}">{parseFloat(billable.price) ? dad.SRE.price(billable.price) + \'&euro;\' : \'Free\'}</div> <div class="sre-pad-l" if="{billable.is_selected}"> <select if="{billable.type == \'Many\'}" onclick="{clicks.cancel_click}" onchange="{clicks.select_billable_count}"> <option riot-value="{(theval+1)}" selected="{(theval+1) == billable.user_count}" each="{repeater, theval in Array(10)}">{theval+1}</option> </select> <div class="frm-item half" each="{fld, extrafield_index in billable.extrafields}"> <label> {fld.name} <span if="{fld.required != 0}">*</span> </label> <input style="width:98%; margin:0" data-billable="{billable_index}" oninput="{set_extra_field}" type="text" data-ref="billable_extra" date-class="{fld.class}" riot-value="{fld.value || \'\'}"> </div> <div style="clear:both"> <div if="{billable.has_error}" class="sre-error"> All fields marked with asterisk are required. </div> </div> <div class="sre-text-right" if="{parseFloat(billable.price) > 0}"> <span if="{billable.type == \'Many\'}">{billable.user_count} &times; {dad.SRE.price(billable.price)}&euro; =</span> <span class="sre-bold">{dad.SRE.price(billable.price * billable.user_count)}&euro;</span> </div> </div> </div> </div> <div class="sre-button-container"> <div class="sre-button sre-next sre-to-right" onclick="{clicks.next_step}">NEXT</div> <div class="sre-button sre-prev" onclick="{clicks.prev_step}">PREVIOUS</div> </div>', '', '', function(opts) {
		var tag = this;
		this.dad = this.parent;

		this.set_extra_field = function(event) {
			var index = event.target.getAttribute('data-billable');
			tag.opts.billables[index].has_error = false;
			tag.opts.billables[index].extrafields[event.item.extrafield_index].value = event.target.value;
		};

		this.clicks = {
			next_step: function(event) {
				event.preventDefault();
				var found = false;
				tag.opts.billables.map(function(billable) {
					if (billable.extrafields && billable.is_selected ) {
						billable.extrafields.map(function(extrafield) {
							if (extrafield.required == "1") {
								if (!extrafield.value || extrafield.value.split(' ').join('').length < 1) {
									billable.has_error = true;
									found = true;
								}
							}
						});
					}
				});
				if (found) {
					return;
				}

				tag.dad.next_step(event);
				tag.dad.update();
			},
			prev_step: function(event) {
				event.preventDefault();
				tag.dad.prev_step(event);
				tag.dad.update();
			},
			toggle_billable: function(event){
				event.preventDefault();
				event.stopPropagation();
				var billable = event.item.billable;
				if (billable.is_selected){
					if (event.currentTarget.getAttribute('data-check') == 1){
						billable.is_selected = false;

					}
				} else {
					billable.is_selected = true;
					billable.user_count = billable.user_count || 1;
				}
				tag.dad.helpers.calculate_extras_total();
			},
			select_billable_count: function(event){
				event.preventDefault();
				event.stopPropagation();
				event.item.billable.user_count = event.target.value;
				tag.dad.helpers.calculate_extras_total();
			},
			set_no_billables: function(event) {
				event.preventDefault();
				tag.dad.state.billables.ids = [];
				tag.dad.state.billables.data = [];
				tag.dad.helpers.calculate_extras_total();
			},
		};

});

		document.getElementsByTagName("body")[0].appendChild(document.createElement('sre-syn'));
		riot.mount('sre-syn',{SRE});
		SRE_conference_show = function (event){
			if (event) {
				event.preventDefault();
			}
			SRE.app.trigger('show');
		};
	};

	var scripts = [
		'//cdn.jsdelivr.net/npm/riot@3.13.2/riot.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/qwest/4.5.0/qwest.min.js'
	].map(SRE.load_script);

		Promise.all(scripts)
			.then(make_tag)
			.catch(function(a){
				console.error(a);
			});
}) ();




