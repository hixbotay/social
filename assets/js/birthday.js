function BirthDay(){
    
    var months = ["", "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"];
    var selectedDay = 1;
    var selectedMonth = 1;
    var selectedYear = new Date().getFullYear() - 25;
    
    this.fill = function(){
        getOldSelection();

        $("#selectedBirthday").val(selectedYear + "-01-01");
        
        //populate our years select box
        for (i = new Date().getFullYear() - 18; i > 1900; i--){
            if(i === parseInt(selectedYear)){
                $('#years').append($('<option />').val(i).html(i).attr("selected", "ture"));
            } else {
                $('#years').append($('<option />').val(i).html(i));
            }
        }
        //populate our months select box
        for (i = 1; i < months.length; i++){
            if(i === parseInt(selectedMonth)){
                $('#months').append($('<option />').val(i).html(months[i]).attr("selected", "ture"));
            } else {
                $('#months').append($('<option />').val(i).html(months[i]));
            }
        }
        
        //populate our Days select box
        updateNumberOfDays(); 

        //"listen" for change events
        $('#years, #months').change(function(){
            updateNumberOfDays();
            getSelection();
        });
        
        //"listen" for change birthday
        $("#years, #months, #days").change(function(){
            getSelection();
            $("#selectedBirthday").val(selectedYear + "-" + selectedMonth + "-" + selectedDay);
        });
    };
    
    //function to update the days based on the current values of month and year
    function updateNumberOfDays(){
        $('#days').html('');
        month = $('#months').val();
        year = $('#years').val();
        days = daysInMonth(month, year);

        for(i=1; i < days+1 ; i++){
            if(i === parseInt(selectedDay)){
                $('#days').append($('<option />').val(i).html(i).attr("selected", "ture"));
            } else {
                $('#days').append($('<option />').val(i).html(i));
            }
        }
    }
    
    //helper function
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    
    function getSelection(){
        selectedMonth = $('#months option:selected').val();
        selectedYear = $('#years option:selected').val();
        selectedDay = $('#days option:selected').val();
    }
    
    function getOldSelection(){
        var args = $("#selectedBirthday").val();
        if(args) {
            args = args.split("-");
            selectedYear = args[0];
            selectedMonth = args[1];
            selectedDay = args[2];
        }
    }
}