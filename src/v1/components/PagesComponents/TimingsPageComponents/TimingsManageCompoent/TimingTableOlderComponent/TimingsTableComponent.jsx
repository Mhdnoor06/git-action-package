import moment from 'moment';
import React,{useRef, useState} from 'react';
import './TimingsTableComponent.css';
import { CiCircleRemove } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";



const TimingsTableComponent = ({TodaysTimings,APITimings}) => {
    const today = new Date();
    const [MasjidTimings, setMasjidTimings] = useState(APITimings);
    const [Clear, setClear ] = useState(false);
    const [Update, setUpdate ] = useState(false);
    const [RangeHasEmpty, setRangeHasEmpty ] = useState(false);
    const [InitialStartTimings, setInitialStartTimings] = useState([])
    const [TotalLength, setTotalLength] = useState(TodaysTimings?.length);
    const [SelectedNamazes, setSelectedNamazes] = useState([]);  
    const [selectedMonth, setselectedMonth] = useState(today.getMonth()+1)
    const [NextMonth, setNextMonth] = useState(today.getMonth()+2)
    const [FajrPrefilled, setFajrPrefilled] = useState(false)
    const [MaghribPrefilled, setMaghribPrefilled] = useState(false)
    const admin = JSON.parse(localStorage.getItem("admin"));
    // const [JummahsNoTimings,setJummahsNoTimings] = useState([]);
    // const [JummahsPreTimings,setJummahsPreTimings] = useState([]);
    // const [JummahsToRemoveData,setJummahsToRemoveData] = useState([]);
    // const [IncompleteDays,setIncompleteDays] = useState([]);
    // const [JummahAdding,setJummahAdding] = useState(false);
    // const [JummahUpdating,setJummahUpdating] = useState(false);
    // const [isUpdating, setisUpdating] = useState(false);
    // const [isAdding, setisAdding] = useState(false);
    // const [isDeleting, setisDeleting] = useState(false);
    // const [isDeletingNamazes, setisDeletingNamazes] = useState(false);
    // const [isAddingNewNamaz, setisAddingNewNamaz] = useState(false);
    // const [isSingle, setisSingle] = useState(false);
    let AllNamazSelectedRef = useRef();
  
    let FajrNameRef = useRef();
    let DhurNameRef = useRef();
    let AsarNameRef = useRef();
    let MaghribNameRef = useRef();
    let IshaNameRef = useRef();
    let JummahNameRef = useRef();
    let TaraweehNameRef = useRef();
    let WitrNameRef = useRef();
    let SalatulNameRef = useRef();
  
    let FajrAzaanRef = useRef();
    let DhurAzaanRef = useRef();
    let AsarAzaanRef = useRef();
    let MaghribAzaanRef = useRef();
    let IshaAzaanRef = useRef();
    let JummahAzaanRef = useRef();
    let TaraweehAzaanRef = useRef();
    let SalatulAzaanRef= useRef();
    let WitrAzaanRef= useRef();
  
    let FajrJamaatRef = useRef();
    let DhurJamaatRef = useRef();
    let AsarJamaatRef = useRef();
    let MaghribJamaatRef = useRef();
    let IshaJamaatRef = useRef();
    let JummahJamaatRef = useRef();
    let TaraweehJamaatRef= useRef();
    let SalatulJamaatRef = useRef();
    let WitrJamaatRef = useRef();


    const handleSelectNamaz = (NamazName,AzaanTime,JamaatTime,e) => {

        const newInfo = {
          namazName:NamazName.current.value,
          azaanTime:  moment(AzaanTime.current.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss") , 
          jamaatTime: moment(JamaatTime.current.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss")
        }
        
        const namazobj = {
          namazName: NamazName.current.value,
          azaanTime: moment(newInfo.azaanTime).unix(), 
          jamaatTime: moment(newInfo.jamaatTime).unix()
        }
    
        if(NamazName.current.value && AzaanTime.current.value && JamaatTime.current.value){
        
          const response = SelectedNamazes.filter((item) => item.namazName === NamazName.current.value);
          if(!response.length>0){
            setSelectedNamazes([...SelectedNamazes,namazobj]);
          }else{
            setSelectedNamazes(SelectedNamazes.filter((item) => item.namazName !== NamazName.current.value));
          }
        }
        else{
          setClear(false);
        }
      }  

  
      
  const handleNamazDecrease = (e) => {
    setTotalLength(prevLength => prevLength - 1)
  }

  const handleNamazIncrease = (e) => {
    setTotalLength(prevLength => prevLength + 1)
  }


      
   const handleAllSelectedNamazTimings = () => {

    const newFajrInfo = {
        namazName:FajrJamaatRef.current?.value,
        azaanTime:  moment(FajrAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(FajrJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }
      
    const newDhurInfo = {
        namazName:DhurNameRef.current?.value,
        azaanTime:  moment(DhurAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(DhurJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }
      
    const newAsarInfo = {
        namazName:AsarNameRef.current?.value,
        azaanTime:  moment(AsarAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(AsarJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }


    const newMaghribInfo = {
        namazName:MaghribNameRef.current?.value,
        azaanTime:  moment(MaghribAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(MaghribJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }
      
    const newIshaInfo = {
        namazName:IshaNameRef.current?.value,
        azaanTime:  moment(IshaAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(IshaJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }
      
    const newJummahInfo = {
        namazName:JummahNameRef.current?.value,
        azaanTime:  moment(JummahAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(JummahJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }
      
    const newTaraweehInfo = {
        namazName:TaraweehNameRef.current?.value,
        azaanTime:  moment(TaraweehAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(TaraweehJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }
      
    const newSalatulInfo = {
        namazName:SalatulNameRef.current?.value,
        azaanTime:  moment(SalatulAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(SalatulJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }

    const newWitrInfo = {
        namazName:WitrNameRef.current?.value,
        azaanTime:  moment(WitrAzaanRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a") , 
        jamaatTime: moment(WitrJamaatRef.current?.value, ["HH:mm"]).format("YYYY-MM-DD  hh:mm:ss a")
      }
      
      const FajrObj = {
          namazName: FajrNameRef.current?.value,
          azaanTime: moment(newFajrInfo?.azaanTime).unix(), 
          jamaatTime: moment(newFajrInfo?.jamaatTime).unix()
        }
      
      const DhurObj = {
          namazName: DhurNameRef.current?.value,
          azaanTime: moment(newDhurInfo?.azaanTime).unix(), 
          jamaatTime: moment(newDhurInfo?.jamaatTime).unix()
        }
      
      const AsarObj = {
          namazName: AsarNameRef.current?.value,
          azaanTime: moment(newAsarInfo?.azaanTime).unix(), 
          jamaatTime: moment(newAsarInfo?.jamaatTime).unix()
        }
      
      const MaghribObj = {
          namazName: MaghribNameRef.current?.value,
          azaanTime: moment(newMaghribInfo?.azaanTime).unix(), 
          jamaatTime: moment(newMaghribInfo?.jamaatTime).unix()
        }
      
      const IshaObj = {
          namazName: IshaNameRef.current?.value,
          azaanTime: moment(newIshaInfo?.azaanTime).unix(), 
          jamaatTime: moment(newIshaInfo?.jamaatTime).unix()
        }
      
      const JummahObj = {
          namazName: JummahNameRef.current?.value,
          azaanTime: moment(newJummahInfo?.azaanTime).unix(), 
          jamaatTime: moment(newJummahInfo?.jamaatTime).unix()
        }
      
      const TaraweehObj = {
          namazName: TaraweehNameRef.current?.value,
          azaanTime: moment(newTaraweehInfo?.azaanTime).unix(), 
          jamaatTime: moment(newTaraweehInfo?.jamaatTime).unix()
        }
      
      const SalatulNameObj = {
          namazName:SalatulNameRef.current?.value,
          azaanTime: moment(newSalatulInfo?.azaanTime).unix(), 
          jamaatTime: moment(newSalatulInfo?.jamaatTime).unix()
        }

      const WitrNameObj = {
          namazName:WitrNameRef.current?.value,
          azaanTime: moment(newWitrInfo?.azaanTime).unix(), 
          jamaatTime: moment(newWitrInfo?.jamaatTime).unix()
        }
        
        
        if(TotalLength === 5){
          
          setClear(true);
          setSelectedNamazes([FajrObj,DhurObj,AsarObj,MaghribObj,IshaObj]);
          
        }else if(TotalLength === 6){
          
          if(JummahObj.namazName && JummahObj.azaanTime && JummahObj.jamaatTime)
          {
            setClear(true);
            setSelectedNamazes([FajrObj,DhurObj,AsarObj,MaghribObj,IshaObj,JummahObj]);
          }
          else{
            Clear && setClear(false);
          }
          
        }else if(TotalLength === 7){

          if(JummahObj.namazName && JummahObj.azaanTime && JummahObj.jamaatTime && TaraweehObj.namazName && TaraweehObj.azaanTime && TaraweehObj.jamaatTime )
          {
            setClear(true);
            setSelectedNamazes([FajrObj,DhurObj,AsarObj,MaghribObj,IshaObj,JummahObj,TaraweehObj]);
          }
          else{
            Clear && setClear(false);
          }
        
          
        }else if(TotalLength === 8){
          
          if(JummahObj.namazName && JummahObj.azaanTime && JummahObj.jamaatTime
             && TaraweehObj.namazName && TaraweehObj.azaanTime && TaraweehObj.jamaatTime
             && SalatulNameObj.namazName && SalatulNameObj.azaanTime && SalatulNameObj.jamaatTime)
          {
            setClear(true);
            setSelectedNamazes([FajrObj,DhurObj,AsarObj,MaghribObj,IshaObj,JummahObj,TaraweehObj,SalatulNameObj]);
          }
          else{
            Clear && setClear(false);
          }
        

        }else if(TotalLength === 9){
          
          if(JummahObj.namazName && JummahObj.azaanTime && JummahObj.jamaatTime
            && TaraweehObj.namazName && TaraweehObj.azaanTime && TaraweehObj.jamaatTime
            && SalatulNameObj.namazName && SalatulNameObj.azaanTime && SalatulNameObj.jamaatTime
            && WitrNameObj.namazName && WitrNameObj.azaanTime && WitrNameObj.jamaatTime)
         {
           setClear(true);
           setSelectedNamazes([FajrObj,DhurObj,AsarObj,MaghribObj,IshaObj,JummahObj,TaraweehObj,SalatulNameObj,WitrNameObj]);
         }
         else{
           Clear && setClear(false);
         }
         

        }
      }


      
  const handleAllNamazSelect = (e) => {
   
    if(e.target.checked){

      let cityCheck=document.getElementsByName("namaz");
	    let cityCheckLen=cityCheck.length;

      for(var x=0;x<cityCheckLen;x++){
   		cityCheck[x].checked=true;
	   }

     handleAllSelectedNamazTimings();
    }
    else{
       
      let cityCheck=document.getElementsByName("namaz");
      let cityCheckLen=cityCheck.length;

      for(var x=0;x<cityCheckLen;x++){
        cityCheck[x].checked=false;
      }
      setSelectedNamazes([]);
    }
  }
     
  return (
    <>
        <table className="ManageTable" >
          <thead>
            <tr className="ManageTableHead">
            <th className="tableHeaderPrayerName">
              <span className="ManageTableHeaderContent">
              <input type="checkbox" className="ManageTableClassName" value="SelectAll" onClick={handleAllNamazSelect} ref={AllNamazSelectedRef}  />Prayer Name
              </span>
            </th>
              <th className="ManageTableHeaderAzaanContent"><span className="tableHeaderContentAzaan">Azaan Time</span></th>
              <th  className="ManageTableHeaderJamaat">
                <span className="ManageTableHeaderJamaatContent">
                  Jamaat Time
                 </span> 
                <button onClick={ handleNamazIncrease} style={{ outline: 'none',border:"none",background:"white"}}  disabled={TotalLength>=9}>
                  <IoIosAddCircleOutline className="IncreaseButton" />
                </button >
              </th>
            </tr>
          </thead>
 
          <tbody  className="ManageTableBody">
             {
           (TodaysTimings?.length>0)&& (
               <tr>
                 <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName" name="namaz" id="allCheck" value={TodaysTimings[0]?.namazName} onClick={(e) =>  handleSelectNamaz(FajrNameRef,FajrAzaanRef,FajrJamaatRef,e)}/> 
                        <input fullWidth margin="dense" name={TodaysTimings[0]?.namazName} className="prayerName" defaultValue={TodaysTimings[0]?.namazName} placeholder={TodaysTimings[0].namazName} ref={FajrNameRef} sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                        />
                      </span>
                   </td>
                  <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt"   sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}} 
                    ref={FajrAzaanRef}
                    className="TimingsInput"
                    defaultValue={moment(TodaysTimings[0].azaanTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                     ref={FajrJamaatRef}
                     className="TimingsInput"
                     defaultValue={moment(TodaysTimings[0].jamaatTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                   </td>
              </tr>)
            }

         {
           (TodaysTimings?.length>1)&& (
              <tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[1]?.namazName} onClick={(e) => handleSelectNamaz(DhurNameRef,DhurAzaanRef,DhurJamaatRef,e)} /> 
                        <input fullWidth margin="dense" name={TodaysTimings[1]?.namazName} className="prayerName" defaultValue={TodaysTimings[1]?.namazName} placeholder={TodaysTimings[1]?.namazName}
                         ref={DhurNameRef}  sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                       />
                      </span>
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    ref={DhurAzaanRef}
                    className="TimingsInput"
                    defaultValue={moment(TodaysTimings[1].azaanTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    ref={DhurJamaatRef}
                    className="TimingsInput"
                    value={moment(TodaysTimings[1].jamaatTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                   </td>
              </tr>)}

              {
           (TodaysTimings?.length>2)&& (
              <tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[2]?.namazName} onClick={(e) => handleSelectNamaz(AsarNameRef,AsarAzaanRef,AsarJamaatRef,e)} /> 
                        <input fullWidth margin="dense" name={TodaysTimings[2]?.namazName} className="prayerName" defaultValue={TodaysTimings[2]?.namazName} placeholder={TodaysTimings[2]?.namazName}  
                        ref={AsarNameRef} sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                       />
                      </span>
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    ref={AsarAzaanRef}
                    className="TimingsInput"
                    value={moment(TodaysTimings[2].azaanTime * 1000).format('HH:mm')}  
                    type="time" 
                    />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    ref={AsarJamaatRef}
                    className="TimingsInput"
                    value={moment(TodaysTimings[2].jamaatTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                   </td>
              </tr>)}


              {
           (TodaysTimings?.length>3)&& (
              <tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[3]?.namazName} onClick={(e) => handleSelectNamaz(MaghribNameRef,MaghribAzaanRef,MaghribJamaatRef,e)}  /> 
                        <input fullWidth margin="dense" name={TodaysTimings[3]?.namazName} className="prayerName" defaultValue={TodaysTimings[3]?.namazName} placeholder={TodaysTimings[3]?.namazName}
                         ref={MaghribNameRef} sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                       />
                      </span>
                        { MaghribPrefilled && <span className="APiInformation">Ⓘ Maghrib timings are prefilled by location of the masjid</span>}
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                     ref={MaghribAzaanRef}
                     className="TimingsInput"
                    value={moment(TodaysTimings[3].azaanTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                     ref={MaghribJamaatRef}
                     className="TimingsInput"
                    value={moment(TodaysTimings[3].jamaatTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                   </td>
              </tr>
              )}


         {
           (TodaysTimings?.length>4)&& (
              <tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[4]?.namazName} onClick={(e) => handleSelectNamaz(IshaNameRef,IshaAzaanRef,IshaJamaatRef,e)} /> 
                        <input fullWidth margin="dense" name={TodaysTimings[4]?.namazName} className="prayerName" defaultValue={TodaysTimings[4]?.namazName} placeholder={TodaysTimings[4]?.namazName}
                         ref={IshaNameRef} 
                         sx={{  marginBottom: 3 ,height: '30px'}} type="text" 
                       />
                      </span>
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    value={moment(TodaysTimings[4].azaanTime * 1000).format('HH:mm')}  
                    ref={IshaAzaanRef}
                    className="TimingsInput"
                    type="time" />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    value={moment(TodaysTimings[4].jamaatTime * 1000).format('HH:mm')} 
                    ref={IshaJamaatRef}
                    className="TimingsInput"
                    type="time" />
                    </span>
                   </td>
              </tr>
           )}

            {
               (TotalLength>5 || TodaysTimings?.length>5)&& (
                <><tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[5]?.namazName} onClick={(e) => handleSelectNamaz(JummahNameRef,JummahAzaanRef,JummahJamaatRef,e)} /> 
                        <input fullWidth margin="dense" name={TodaysTimings[5]?.namazName} className="prayerName" defaultValue={TodaysTimings[5]?.namazName} placeholder={TodaysTimings[5]?.namazName}
                         ref={JummahNameRef}  sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                        
                       />
                      </span>
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    value={moment(TodaysTimings[5]?.azaanTime * 1000).format('HH:mm')}  
                     ref={JummahAzaanRef}
                     className="TimingsInput"
                    type="time" />

                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    value={moment(TodaysTimings[5]?.jamaatTime * 1000).format('HH:mm')} 
                    ref={JummahJamaatRef}
                    className="TimingsInput" 
                    type="time" />
                     <CiCircleRemove className="RemoveNamazButton" onClick={handleNamazDecrease}/>
                    </span>
                   </td>
                   
              </tr></>)
               }

              {
               (TotalLength>6 || TodaysTimings?.length>6)&& (<tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[6]?.namazName} onClick={(e) => handleSelectNamaz(TaraweehNameRef,TaraweehAzaanRef,TaraweehJamaatRef,e)} /> 
                        <input fullWidth margin="dense" name={TodaysTimings[6]?.namazName} className="prayerName" defaultValue={TodaysTimings[6]?.namazName} placeholder={TodaysTimings[6]?.namazName}
                         ref={TaraweehNameRef}  sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                       />
                      </span>
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                     ref={TaraweehAzaanRef}
                     className="TimingsInput" 
                      value={moment(TodaysTimings[6]?.azaanTime * 1000).format('HH:mm')}  
                    type="time" />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                     ref={TaraweehJamaatRef}
                     className="TimingsInput"
                      value={moment(TodaysTimings[6]?.jamaatTime * 1000).format('HH:mm')}  
                    type="time" />
                     <CiCircleRemove className="RemoveNamazButton" onClick={handleNamazDecrease}/>
                    </span>
                   </td>
              </tr>)
              } 
             {
               (TotalLength>7 || TodaysTimings?.length>7) && (
              <tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[7]?.namazName} onClick={(e) => handleSelectNamaz(SalatulNameRef,SalatulAzaanRef,SalatulJamaatRef,e)} /> 
                        <input fullWidth margin="dense" name={TodaysTimings[7]?.namazName} className="prayerName" defaultValue={TodaysTimings[7]?.namazName} placeholder={TodaysTimings[7]?.namazName} ref={SalatulNameRef}  sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                       />
                      </span>
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    value={moment(TodaysTimings[7]?.azaanTime * 1000).format('HH:mm')}  
                    className="TimingsInput" ref={SalatulAzaanRef}
                    type="time" />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                       className="TimingsInput" ref={SalatulJamaatRef}
                    value={moment(TodaysTimings[7]?.jamaatTime * 1000).format('HH:mm')}  
                    type="time" />
                     <CiCircleRemove className="RemoveNamazButton" onClick={handleNamazDecrease}/>
                    </span>
                   </td>
              </tr>)
              }
             {
               (TotalLength>8 || TodaysTimings?.length>8)&& (
              <tr>
                  <td className="tableRow" >
                     <span className="tableHeaderContentBodyName">
                      <input type="checkbox" className="ManageTableClassName"  name="namaz" value={TodaysTimings[8]?.namazName} onClick={(e) => handleSelectNamaz(WitrNameRef,WitrAzaanRef,WitrJamaatRef,e)} /> 
                        <input fullWidth margin="dense" name={TodaysTimings[8]?.namazName} className="prayerName" defaultValue={TodaysTimings[8]?.namazName} placeholder={TodaysTimings[8]?.namazName} ref={WitrNameRef}  sx={{  marginBottom: 3 ,height: '30px'}} 
                        type="text" 
                       />
                      </span>
                   </td>
                   <td className="tableRow" >
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                    value={moment(TodaysTimings[8]?.azaanTime * 1000).format('HH:mm')}  
                    className="TimingsInput" ref={WitrAzaanRef}
                    type="time" />
                    </span>
                  </td>
                  <td className="tableRow">
                    <span className="tableHeaderContentBody">
                    <input  id="outlined-required" disableunderline name="appt-time" sx={{border: '1.5px solid grey',padding:'10px' , borderRadius: 1}}
                       className="TimingsInput" ref={WitrJamaatRef}
                    value={moment(TodaysTimings[8]?.jamaatTime * 1000).format('HH:mm')}  
                    type="time" />
                     <CiCircleRemove className="RemoveNamazButton" onClick={handleNamazDecrease}/>
                    </span>
                   </td>
              </tr>)
              }
          </tbody>
        </table>
    </>
  )
}

export default TimingsTableComponent
