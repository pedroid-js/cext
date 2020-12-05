import React from 'react'
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-xml"
import "ace-builds/src-noconflict/mode-ruby"
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github"

const CodeEditor = ({
  handleChange,
  def,
  theme,
  mode
}) => 
  <AceEditor  
    mode={mode} 
    theme={theme} 
    onChange={handleChange} 
    name="codeEditor"  
    editorProps={{  $blockScrolling: true }}
    value={def}
    height="370px"
    width="465px"
  />
  
export default CodeEditor