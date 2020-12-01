import React from 'react';

import { Container } from './styles';
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import {AiOutlineClockCircle} from "react-icons/ai"
import {BsFillClockFill} from "react-icons/bs"
import {BsClipboardData} from "react-icons/bs"


function monitorCard(props) {

    console.log(props)
    

    let getTypeAndValue = (key,value) => 
    {
        let keyType = {
            icmppingloss : ["ICMP Packet Loss", `${parseFloat(value).toFixed(2)} %`, parseFloat(value).toFixed(2) < 20? "blue":"red"],
            icmpping : ["Host Status", value=="1"? "Host UP":"Host Down",value=="1"? "blue":"red"],
            icmppingsec : ["ICMP Packet Latency", `${parseFloat(value).toFixed(2)} ms`,parseFloat(value).toFixed(2) < 300? "blue":"red"],
        }
        return keyType[key]
    }

    let getIcon = (key) => {
        if (key==="icmppingloss"){
            return <BsClipboardData size={32} style={{ fill: dataToShow[2] }}/>
        }
        if (key==="icmpping"){
            if (props.value==="1"){
            return <BsArrowUp size={32} style={{ fill: dataToShow[2] }}/>
            }else
            return <BsArrowDown size={32} style={{ fill: dataToShow[2] }}/>

        }
        if (key==="icmppingsec"){
            return <AiOutlineClockCircle size={32} style={{ fill: dataToShow[2] }}/>
        }
    }
    let dataToShow = getTypeAndValue(props.keyType,props.value)
  return (
      <>
      <Container>
          <div className="divBorder">
          <strong style={{paddingBottom:"10px"}}> {dataToShow[0]}</strong>
          <div>
          <div className="divSvg" style={{padding:"10px"}}>
              {getIcon(props.keyType)}
          </div>
          <div className="divDados" style={{ alignSelf: "center" }}>
              <p>{dataToShow[1]}</p>
          </div>
          </div>
          </div>
      </Container>
      </>
  );
}

export default monitorCard;