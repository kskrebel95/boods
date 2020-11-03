$( document ).ready(function() {
            // $( "#dogsubmit" ).click(function() {
            //     console.log($("#name").val());
            // });
            // $('#postform').submit(function(e){ /*run function on submit of form porstform */
            //          e.preventDefault();  /*prevent default behavior (GET)*/

            //         //  Swal.fire({
            //         //     position: 'middle',
            //         //     icon: 'success',
            //         //     title: 'Your work has been saved',
            //         //     showConfirmButton: false,
            //         //     timer: 1500
            //         //     });

            //         var name=$('#name').val();
            //         var type=$('#type').val();
            //         var weight=$('#weight').val();
            //         var color=$('#color').val();

            //         var url =$(this).attr('action'); /* can say this cause we are referring to attribute action of form postform */
            //             console.log($(this).attr('action'));
            //         /* posts to url the object containing title and body and displays msg and data afterwards */
            //         $.post(url,{name:name, type:type, weight:weight, color:color}).done(function(data){
            //             console.log('Post Saved');
            //             console.log(data);
            //         });
            //     });
            // var url="https://jsonplaceholder.typicode.com/posts";
            // var t="hello";
            // var body="body";
            // $.post(url,{userId:"2",title:t, body:body}).done(function(data){
            //             console.log('Post Saved');
            //             console.log(data);
            //         });


            // GET (Generates Dog Info Table Rows & Update/Delete Dogs Dropdown Menu )
            $.ajax({
                method: "GET",
                url: "https://my-json-server.typicode.com/kskrebel95/mockjson/db",
                dataType: "json"
                }).done(function(data){
                       console.log('GET successful!');
                       console.log(data);
                    $.each( data.dogs, function( index,dogs) {
                        // console.log(data.dogs[index]);
                        $("#getdogs tbody").append("<tr><td>"+data.dogs[index].id+"</td><td>"+data.dogs[index].name+"</td><td>"+data.dogs[index].type+"</td><td>"+data.dogs[index].weight+"</td><td>"+data.dogs[index].color+"</td></tr>");
                        //Creates dropdown 
                        $("#updateordeletedogs select").append("<option data-dogsid="+data.dogs[index].id+" value="+data.dogs[index].name+">"+data.dogs[index].name+"</option>");
                    });
                    // console.log(data.dogs[0].name);
                 });

                // TEST to get info within a specific array dogs
                $.ajax({
                method: "GET",
                url: "https://my-json-server.typicode.com/kskrebel95/mockjson/dogs",
                dataType: "json"
                }).done(function(data){
                       console.log('GET dogs successful!');
                       console.log(data);
                 });


                // $.post( "https://my-json-server.typicode.com/kskrebel95/mockjson/dogs", {name: "Amaterasu", type: "Chow Chow",weight: "60 lbs", color: "white" } ).done(function(data){

                // 	console.log('Posted new dog');
                // 	console.log(data);

                // });

                //POST (Submit new dog data)

            	$( "#sub-btn" ).click(function() {
            		name=$("#name").val();
            		type=$("#type").val();
				  	weight=$("#weight").val() + " lbs";
				  	color=$("#color").val();
				  	console.log(name,type,weight,color);
				  	$.post( "https://my-json-server.typicode.com/kskrebel95/mockjson/dogs", {name: name, type: type,weight: weight, color: color} ).done(function(data){

                	// alert('New Dog Added!');
                	swal({
					  title: "Posted!",
					  text: "New Dog Added",
					  icon: "success",
					  button: "OK",
					});
                	console.log(data);

                });
				  	$('#enterdog').find('input').val(''); 
				  	
				});

			$.ajax({
                method: "PUT",
                url: "https://my-json-server.typicode.com/kskrebel95/mockjson/dogs/1",
                dataType: "json",
                name:"Jeezy"
                }).done(function(data){
                       console.log('Dog successfully UPDATED');
                       console.log(data);

                 });

            $.ajax({
                method: "DELETE",
                url: "https://my-json-server.typicode.com/kskrebel95/mockjson/dogs/1",
                dataType: "json",
                }).done(function(data){
                       console.log('Dog successfully DELETED');
                       console.log(data);

                 });

            // populate update/delete form on page load

            $.ajax({
            	method:"GET",
            	url:"https://my-json-server.typicode.com/kskrebel95/mockjson/dogs/1",
            	dataType:"json"

            }).done(function(data){
            	console.log(data);
            	$("#up_type").val(data.type);
            	$("#up_weight").val(data.weight);
            	$("#up_color").val(data.color);
            });

            //populate form based on the changing of dropdown value
            $("#dog_names").change(function(){
			  // alert("Dog changed.");
			  // console.log($("#dog_names option:selected").val());
				 var dogid=$("#dog_names option:selected").data("dogsid");
	   			// console.log(dogid);

	   			var newdogurl="https://my-json-server.typicode.com/kskrebel95/mockjson/dogs/"+dogid;

	   			// console.log(newdogurl);

	   			$.ajax({
            	method:"GET",
            	url:newdogurl,
            	dataType:"json"

	            }).done(function(data){
	            	// console.log(data);
	            	$("#up_type").val(data.type);
	            	$("#up_weight").val(data.weight);
	            	$("#up_color").val(data.color);
	            });

			  
			});

            $("#update-btn").click(function(){
            	var dogid=$("#dog_names option:selected").data("dogsid");
	   			var newdogurl="https://my-json-server.typicode.com/kskrebel95/mockjson/dogs/"+dogid;

	   			$.ajax({
                method: "PUT",
                url: newdogurl,
                dataType: "json",
                id:dogid
                }).done(function(data){
                       // alert('Successfully UPDATED');
                       swal({
						  title: "Updated!",
						  text: "Dog Data Modified",
						  icon: "success",
						  button: "OK",
						});
                       console.log(data);

                 });
            });

            $("#delete-btn").click(function(){
            	var dogid=$("#dog_names option:selected").data("dogsid");
	   			var newdogurl="https://my-json-server.typicode.com/kskrebel95/mockjson/dogs/"+dogid;

	   			$.ajax({
                method: "DELETE",
                url: newdogurl,
                dataType: "json",
                id:dogid
                }).done(function(data){
                       // alert('Successfully DELETED');
                       swal({
						  title: "Deleted!",
						  text: "Dog Data Removed",
						  icon: "success",
						  button: "OK",
						});
                       console.log(data);

                 });
            });
   			
            $("#searchDogInfo").keyup(function(){
                var result = $(this).val().toLowerCase();

                $("#dogInfo tr").filter(function(){
                    $(this).toggle($(this).text().toLowerCase().indexOf(result)>=0);
                });
            });

            $("#sortId, #sortName, #sortType,#sortWeight, #sortColor ").on("click",function(){
                
                $.ajax({
                method: "GET",
                url: "https://my-json-server.typicode.com/kskrebel95/mockjson/dogs",
                dataType: "json"
                }).done(function(data){
                    console.log(data);
                    
                });

            });

            // $("#sortId").on("mousemove",function(e){
            //     console.log(e.currentTarget);
            // });
            $("#sortId").on("click",function(){

            
            });
        });

        