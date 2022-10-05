import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './layout_admin.module.scss'
type Props = {}

const Layout_admin = (props: Props) => {
  return (
    <div>
      <header className={`${styles.navbar2} navbar navbar-dark sticky-top bg-warning flex-md-nowrap p-0 shadow`}>
        <div className="col-6  ">
          <div className="menu mx-5 my-3">
            <nav className="stroke">
              <ul className="nav">
                <li className="nav-item"><a href="#" className="nav-link text-light Suncinema">Suncinema</a></li>
                <li className="nav-item mx-3"><a href="#" className="nav-link text-light Suncinema"><span className="material-symbols-outlined home-icon">
                  home
                </span></a></li>
              </ul>
            </nav>
          </div>
          
        </div>
        <div className="col-6 d-flex justify-content-end">
          <div className="search-box w-50 justify-content-end">
            <input className="form-control form-control-e rounded-pill form-control-dark p-2 border bg-white  border-3" type="text" placeholder="Search" aria-label="Search" />
          </div>
          <div className="navbar-nav mx-3">
            <div className="nav-item text-nowrap">
              <a className="nav-link text-light px-3" href="#">Sign out</a>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="menu sidebarMenu-bg col-md-3 col-lg-2 m-0 d-md-block bg-light sidebar collapse">
            <nav className="position-sticky pt-3 stroke">
              <ul className="nav flex-column">
                <li className="nav-item ">
                  <a className="nav-link text-secondary active" aria-current="page" href="./index.html">
                    <span className="material-symbols-outlined">
                      emergency_recording
                    </span>
                    <span className="mx-3 my-2">Quản lí phim</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="./account.html">
                    <span className="material-symbols-outlined">
                      folder_shared
                    </span>
                    <span className="mx-3 my-2">Người dùng</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <span className="material-symbols-outlined">
                      stairs
                    </span>
                    <span className="mx-3 my-2">Thống kê</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <span className="material-symbols-outlined">
                      dynamic_feed
                    </span>
                    <span className="mx-3 my-2">Quản lí rạp</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <span className="material-symbols-outlined">
                      microwave_gen
                    </span>
                    <span className="mx-3 my-2">Thể loại</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <span className="material-symbols-outlined">
                      output
                    </span>
                    <span className="mx-3 my-2">Logout </span>
                  </a>
                </li>
              </ul>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a className="link-secondary" href="#" aria-label="Add a new report">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle" aria-hidden="true">
                    <circle cx={12} cy={12} r={10} />
                    <line x1={12} y1={8} x2={12} y2={16} />
                    <line x1={8} y1={12} x2={16} y2={12} />
                  </svg>
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1={16} y1={13} x2={8} y2={13} />
                      <line x1={16} y1={17} x2={8} y2={17} />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1={16} y1={13} x2={8} y2={13} />
                      <line x1={16} y1={17} x2={8} y2={17} />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1={16} y1={13} x2={8} y2={13} />
                      <line x1={16} y1={17} x2={8} y2={17} />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1={16} y1={13} x2={8} y2={13} />
                      <line x1={16} y1={17} x2={8} y2={17} />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </nav>
          </nav>
          <main className="col-md-7 ms-sm-auto col-lg-10 px-md-4">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div />
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div />
              </div>
            </div>
            <div className="d-flex side-bar-e justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h3 className="h6 col-2">QUẢN LÍ </h3>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="Share btn btn-sm btn-outline-secondary">Share</button>
                  <button type="button" className="Export btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" className=" this-week btn btn-sm btn-outline-secondary dropdown-toggle">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar" aria-hidden="true">
                    <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                    <line x1={16} y1={2} x2={16} y2={6} />
                    <line x1={8} y1={2} x2={8} y2={6} />
                    <line x1={3} y1={10} x2={21} y2={10} />
                  </svg>
                  <span className="text-white">This week</span>
                </button>
              </div>
            </div>
            {/* <Outlet/> */}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout_admin