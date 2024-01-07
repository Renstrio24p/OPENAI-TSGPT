
import TSGPT from "../../pages/Chat/TSGPT"

export default function Render(){

  const TSDOM = document.querySelector('#TS') as HTMLDivElement | null

  {TSDOM && TSGPT(TSDOM)}

}