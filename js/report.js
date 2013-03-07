$('#reportsPage').on('pageshow', function(event){
	BPApp.Report.start();
});
  
  BPApp.Report = {
  	start: function(){
  		this.displayReports();
  		this.bindEvents();
  	},

	displayReports: function(){
		var auth_key = localStorage.getItem("auth_key");
		if($('#reportsSelect').find('option').length == 1){
			$.ajax({
				url: Config.serviceURL + 'BPK.pkg_json.Raporty',
				data: {'AuthKey': auth_key},
				type: 'GET',
	           	cache: true,
				dataType: 'jsonp',
				crossDomain: true,
				contentType: 'application/json; charset=utf-8',
				success: function(data){     
					$('#reportsSelect').html('<option data-placeholder="true">Wybierz</option>');
	    			$.each(data.raporty, function(i, item){
						$('#reportsSelect').append('<option value="' + item.raport_kod + '"> '  + item.raport_nazwa +  '</option>');

					});
					$('#reportsSelect').selectmenu('refresh');
	       		},
				error: function(message){
						console.log('errr');
	          			console.log(message);
	          		}
	   		});
		}
	},
	
	displayDocuments : function(event){
		var auth_key = localStorage.getItem("auth_key");
		$.ajax({
			url: Config.serviceURL + 'BPK.pkg_json.DokNieZaplacone',
			data: {'AuthKey': auth_key},
			type: 'GET',
           	cache: true,
			dataType: 'jsonp',
			crossDomain: true,
			contentType: 'application/json; charset=utf-8',
			success: function(data){    
				$('#documentsList').html('');
    			$.each(data.dokumenty, function(i, item){
					$('#documentsList').append('<span>' + item.ds_id + ' '  + item.ds_brutto +  '</span>');
				})

				if(data.dokumenty.length == 0){
					alert('Nie masz dokumentów do zapłaty.');
				}
       		},
			error: function(message){
					console.log('errr');
          			console.log(message);
          		}
   		});
	},

	generateReport: function(event){
		var auth_key = localStorage.getItem("auth_key");
		var dateSince = $('#dateSince').val();
		var dateTo = $('#dateTo').val();
		var reportType = $('#reportsSelect').val();
		$.ajax({
			url: Config.serviceURL + 'BPK.pkg_json.Raport',
			data: {'AuthKey': auth_key, 'RaportKod': reportType, 'DataOd': dateSince, 'DataDo': dateTo, 'Typ': 'pdf'},
			type: 'GET',
           	cache: true,
			dataType: 'jsonp',
			crossDomain: true,
			contentType: 'application/json; charset=utf-8',
			success: function(data){     
    			$('#linkToReport').html('<a href="' + data.raport_url + '" target="_blank">Link do raportu</a>');
       			$('#linkToReport').show();
       		},
			error: function(message){
					console.log('errr');
          			console.log(message);
          		}
   		});
	},

	bindEvents: function(){
		var self = this;
		$('#documents').on('click', function(event) {
			self.displayDocuments(event);
		});

		$('#createReport').on('click', function(event){
			self.generateReport(event);
		})
	}
}