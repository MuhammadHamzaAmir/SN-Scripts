 function findAndReplaceSpecifications() {
        var convSetSysId = this.getParameter("sys_conv_set_id");
        var findOpsSysIdArray = this.getParameter("sys_find_ops").split(',');
        var newOpsSysIdArray = this.getParameter("sys_new_ops").split(',');
        var selectedOps = this.getParameter("sys_selected_ops");
        var view = this.getParameter("sys_view");
        var table = this.getParameter("sys_table");
        var field = this.getParameter("sys_field");
		
		
		
		


        if ((findOpsSysIdArray.length == 1) && (findOpsSysIdArray[0].length == 0)) {
            findOpsSysIdArray = [];
        }
        if ((newOpsSysIdArray.length == 1) && (newOpsSysIdArray[0].length == 0)) {
            newOpsSysIdArray = [];
        }

        var diff = 0;
        var diffArr = [];
        var whichArr = "";

        if (findOpsSysIdArray.length > newOpsSysIdArray.length) {
            diff = findOpsSysIdArray.length - newOpsSysIdArray.length;
            whichArr = "og";
            for (var i = 0; i < diff; i++) {
                diffArr.push(findOpsSysIdArray[findOpsSysIdArray.length - 1 - i]);
            }
            // cut off the extra elements from the longer array
            findOpsSysIdArray = findOpsSysIdArray.slice(
                0,
                findOpsSysIdArray.length - diff
            );
        } else if (newOpsSysIdArray.length > findOpsSysIdArray.length) {
            diff = newOpsSysIdArray.length - findOpsSysIdArray.length;
            whichArr = "new";
            for (i = 0; i < diff; i++) {
                diffArr.push(newOpsSysIdArray[newOpsSysIdArray.length - 1 - i]);
            }
            // cut off the extra elements from the longer array
            newOpsSysIdArray = newOpsSysIdArray.slice(
                0,
                newOpsSysIdArray.length - diff
            );
        }

        var opsGr = new GlideRecord(table);
		if (view == "list"){
			opsGr.addEncodedQuery("sys_idIN"+selectedOps);
		}else{
			opsGr.addEncodedQuery("<TABLE_NAME>=" + convSetSysId);
		}
        opsGr.query();


        while (opsGr.next()) {
            var srcOps = opsGr.getValue(field);
			
            for (i = 0; i < findOpsSysIdArray.length; i++) {
                if ((srcOps !== null) && (srcOps.includes(findOpsSysIdArray[i]))) {
					if (srcOps.includes(newOpsSysIdArray[i])){
						srcOps = srcOps.replace(findOpsSysIdArray[i], "");
                        // remove consecutive commas and trailing commas
                        srcOps = srcOps.replace(/,{2,}/g, ",").replace(/,$/, "");
					}
					else{
						srcOps = srcOps.replace(findOpsSysIdArray[i], newOpsSysIdArray[i]);
					}
                    opsGr.setValue(field,srcOps);
                    opsGr.update();
                }
            }

            srcOps = opsGr.getValue(field);
            // now if there are extra elements in Original Options to be removed
            if (whichArr == "og") {
                for (i = 0; i < diffArr.length; i++) {
                    if ((srcOps !== null) && (srcOps.includes(diffArr[i]))) {
                        srcOps = srcOps.replace(diffArr[i], "");
                        // remove consecutive commas and trailing commas
                        srcOps = srcOps.replace(/,{2,}/g, ",").replace(/,$/, "");
						opsGr.setValue(field,srcOps);
                        opsGr.update();
                    }
                }
            }

            // now if there are extra elements in New Options to be added
            if (whichArr == "new") {
                for (i = 0; i < diffArr.length; i++) {
					if (srcOps === null) {
                        srcOps = diffArr[i];
						opsGr.setValue(field,srcOps);
                        opsGr.update();
                    }
                    if (!(srcOps.includes(diffArr[i]))) {
                        srcOps += "," + diffArr[i];
                        opsGr.setValue(field,srcOps);
                        opsGr.update();
                    }
                }
            }

        }

        return "Done";

    }