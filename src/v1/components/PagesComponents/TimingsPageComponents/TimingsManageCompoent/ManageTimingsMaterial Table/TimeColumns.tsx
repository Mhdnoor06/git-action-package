import React from "react"
import { TextField,Input } from '@material-ui/core';
import moment from 'moment';
import { TableCell } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
interface EditComponentProps {
  rowData: any;
  onChange: (value: any) => void;
}
export const TimeColumns = [
    {
      field: "namazName",
      title: "Namaz Name",
      width: 450,
    },
    {
      field: "azaanTime",
      title: "Azaan Time",
      width: 450,
      render: (data:any) => {

        let mydate = new Date(data.azaanTime*1000);

        var time = mydate.toLocaleString([], {timeStyle: 'short'});

        return time;
      },
      editComponent: (props:EditComponentProps) => (
        <TextField 
          id="outlined-required"
          // disableunderline
          name="appt-time"
          // sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
          defaultValue={moment(props?.rowData?.azaanTime * 1000).format('hh:mm')} 
          onChange={(e) => props.onChange(e.target.value)} 
          type="time"
        /> 
      )
    },
    {
      field: "jamaatTime",
      title: "Jamat Time",
      width: 450,
      render: (data:any) => {
        let mydate = new Date(data.jamaatTime*1000);
        
        var time = mydate.toLocaleString([], {timeStyle: 'short'});

        return time;
      },
      editComponent: (props:EditComponentProps) => (
        <Input 
          id="outlined-required"
          // disableunderline
          // sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
          defaultValue={moment(props?.rowData?.jamaatTime * 1000).format('hh:mm')} 
          onChange={(e) => props.onChange(e.target.value)} 
          type="time"
        /> 
      
      )
    },
  ]
