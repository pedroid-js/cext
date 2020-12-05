import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Button from '../../../commons/Button'
import GetAppIcon from '@material-ui/icons/GetApp'
import { UNSAFEinject } from '../../../../controllers/inject'
import { copyToClipboard } from '../../../../controllers/utils'
import toAmpAttributes from '../../../../assets/js/toAmpAttributes'

const Amp = () => {
  const [code, setCode] = React.useState(null)

  const handleClick = () => {
    const callback = (res) => setCode(
      toAmpAttributes(
        res
      )
    )
    UNSAFEinject(`return document.documentElement.outerHTML`, callback)
  }

  React.useState(() => {
    copyToClipboard(code)
    console.log(code)
  }, [code])

  return (
    <>
      <Button 
        handleClick={handleClick}
        icon={<GetAppIcon />}
        className=""
      >
        FETCH PAGE  
      </Button>
    </>
  )
}

export default Amp
