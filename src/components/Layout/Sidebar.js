import React, { useState } from 'react'

import LogoDefault from './assest/logo.svg'
import {ReactComponent as UserIcon }  from './assest/user.svg'
import {ReactComponent as FileIcon }  from './assest/file.svg'
import {ReactComponent as CopyIcon }  from './assest/copy.svg'
import {ReactComponent as OrgIcon }  from './assest/org.svg'
import {ReactComponent as CloseIcon }  from './assest/close.svg'
import {ReactComponent as OpenIcon }  from './assest/open.svg'
import {ReactComponent as DownIcon }  from './assest/down.svg'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [collapsible, setCollasible] = useState(false);

  const MenuItem = ({title, icon, path, child}) => {
    const [expand, setExpand] = useState(false)
    return (
      <>
        {!child && (
          <Link to={path}>
            <div className={`nav__link`} title={title}>
              <>
                <div className="nav__icon-container">{icon}</div>
                <div className="nav__label">{title}</div>
              </>
            </div>
          </Link>
        )}
        {child && (
          <>
            <div className={`nav__link`} title={title}>
              <div
                className="flex w-full gap-x-2"
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                <div className="nav__icon-container">{icon}</div>
                <div className="nav__label">{title}</div>
              </div>
              <div
                className="nav__icon_dropdown"
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                <DownIcon />
              </div>
              <div className="nav__child_hover">
                {child &&
                  child.map((item, index) => (
                    <Link key={index} to={`${item.path}`}>
                      <div className="nav__link_child">{item.title}</div>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="nav__child">
              {expand &&
                child &&
                child.map((item, index) => (
                  <Link key={index} to={`${item.path}`}>
                    <div className="nav__link_child">{item.title}</div>
                  </Link>
                ))}
            </div>
          </>
        )}
      </>
    );
  }
  return (
    <div className={`header ${collapsible === true ? 'header-collapsed' : ''}`}>
      <div className="logo">
        <img src={LogoDefault} alt="logo" />
      </div>
      <nav className={`nav ${collapsible === true ? 'nav-collapsed' : ''}`}>
        <MenuItem title='Quản trị thành viên' icon={(<UserIcon/>)} path='/users'/>
        <MenuItem title='Danh mục' icon={(<FileIcon/>)} path='#' child={[
          {
            title: 'Ngành nghề',
            path: '/fields'
          },
          {
            title: 'Khóa',
            path: '/course'
          },
          {
            title: 'Lớp',
            path: '/classes'
          },
        ]}/>
        <div className=" nav__link  " title='Đồ án'>
          <div className='nav__icon-container'>
            <CopyIcon />
          </div>
          <div className="nav__label">
          <MenuItem title='Do an' icon="" path='/Topic'/>
          </div>
         
        </div>
        <MenuItem title='Tổ chức' icon={(<OrgIcon/>)} path='/org'/>
      </nav>
      <div className='collapse__button'>
            <button onClick={()=>{
              setCollasible(!collapsible)
            }}>
                <OpenIcon/>
            </button>
      </div>
    </div>
  );
}

export default Sidebar