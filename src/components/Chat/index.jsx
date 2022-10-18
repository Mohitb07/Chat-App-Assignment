import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)


import Message from '../Message';
import User from '../Users/User';

const CHATS = [
  {
    message: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock", 
    timestamp: '2 days ago',
    id: '07'
  },
  {
    message: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock", 
    timestamp: '2 days ago',
    id: '07'
  },
  {
    message: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock", 
    timestamp: '2 days ago',
    id: '07',
  },
  {
    message: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock", 
    timestamp: '2 days ago',
    id: '07',
  },
  {
    message: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock", 
    timestamp: '2 days ago',
    id: '07',
  },
  {
    message: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock", 
    timestamp: '2 days ago',
    id: '07',
  },
  {
    message: "Hmm...", 
    timestamp: '2 days ago',
    id: '123',
  },
  {
    message: "How are you doing?", 
    timestamp: '2 days ago',
    id: '123',
  },
  {
    message: "How are you doing?", 
    timestamp: '2 days ago',
    id: '123',
  },
  {
    message: "How are you doing?", 
    timestamp: '2 days ago',
    id: '123',
  },
  {
    message: "How are you doing?", 
    timestamp: '2 days ago',
    id: '123',
  },
  {
    message: "How are you doing?", 
    timestamp: '2 days ago',
    id: '123',
  },
  {
    message: "How are you doing?", 
    timestamp: '2 days ago',
    id: '123',
  },
]

function Chat() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('receive_message', (data) => {
      console.log('client received message', data)
      setChatList(prev => [...prev, data])
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendMessage = () => {
    const formattedData = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    socket.emit('send_message', {
      data: formattedData
    });
    setEditorState(EditorState.createEmpty())
  }


  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };

  
  return (
    <div className='overflow-hidden h-full flex flex-col'>
       <p>Connected: { '' + isConnected }</p>
      <div className='p-10'>
        <User/>
        {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      </div>
      <div className='flex p-10 h-auto flex-col overflow-y-auto'>
        {chatList?.map(c => <Message id={c.id} message={c.message} time={c.timestamp}/>)}
      </div>
      <div className='bg-[#1D2A2F] px-5 py-3 w-full mt-auto'>
        {/* <input type='text' className='bg-[#101D24] rounded-full w-full px-6 py-3 outline-none' placeholder='Send a message...' /> */}
        <button className='px-6 py-4 bg-green-500' onClick={sendMessage}>Send</button>
        <Editor
          toolbarStyle={{backgroundColor: 'transparent', border: 'none'}}
          toolbar={{
            options: ['inline', 'link', 'list','blockType'],
            inline: {
              inDropdown: false,
              className: 'inline',
              component: undefined,
              dropdownClassName: undefined,
              options: ['bold', 'italic', 'strikethrough'],
              bold: { icon: 'https://img.icons8.com/fluency-systems-regular/16/FFFFFF/bold.png' },
              italic: { icon: 'https://img.icons8.com/material-outlined/16/FFFFFF/italic.png'},
              strikethrough: { icon: 'https://img.icons8.com/fluency-systems-filled/16/FFFFFF/strikethrough.png'},
            },
            link: {
              inDropdown: false,
              className: 'link',
              component: undefined,
              popupClassName: undefined,
              dropdownClassName: undefined,
              showOpenOptionOnHover: true,
              defaultTargetOption: '_self',
              options: ['link'],
              link: { icon: 'https://img.icons8.com/sf-regular-filled/18/FFFFFF/link.png' },
              linkCallback: undefined
            },
            list: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['unordered', 'ordered', ],
              unordered: { icon: 'https://img.icons8.com/ios-filled/16/FFFFFF/bulleted-list.png', className: undefined },
              ordered: { icon: 'https://img.icons8.com/ios/16/FFFFFF/numbered-list.png', className: undefined },
            },
            blockType: {
              inDropdown: false,
              options: ['Blockquote', 'Code',],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
          }}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default Chat