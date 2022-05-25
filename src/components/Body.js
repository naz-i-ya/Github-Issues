import React, { useState, useEffect } from 'react'
import './Body.css'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from 'axios'
import Loading from './Loading'

dayjs.extend(relativeTime);

const issueIcon = (
    <svg
        viewBox="0 0 14 16"
        version="1.1"
        width="14"
        height="16"
        aria-hidden="true"
        fill="#28a745"
    >
        <path
            fillRule="evenod"
            d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
        />
    </svg>
);

const IssueRow = ({ data }) => {
    const userLoginName = data.user.login;
    const createdTimeAgo = dayjs().to(dayjs(data.created_at));
    const subtitle = `# ${data.user.id} opened ${createdTimeAgo} by `;
    const lName = data.labels.map((label) => label.name ? label.name : <></>)
    console.log(lName)
    return (
        <a href={data.html_url}>
            <div className="issue-row">
                <div className="issue-icon">{issueIcon}</div>
                <div className="issue-text">
                    <div className="issue-title">{data.title.slice(0, 90)} {" "}
                        {lName[0] ? <span className="issue-bug">issue: bug report</span> : ""}
                        {" "}
                        {lName[0] ? <span className="issue-name">{lName[0]}</span> : ""}

                    </div>
                    <div className="issue-subtitle">
                        {subtitle}
                        <a
                            href={`https://github.com/facebook/create-react-app/issues/created_by/${userLoginName}`}
                        >
                            {" "}
                            {userLoginName}
                        </a>
                    </div>
                </div>
            </div>
        </a>
    );
};


const Body = () => {

    const [search, setSearch] = useState('');
    const [display, setDisplay] = useState( false );
    // const [issues, setIssues] = useState([]);

    const fetchData = async() =>{
        const res = await axios.get('https://api.github.com/repos/facebook/create-react-app/issues');
        console.log(res);
        console.log(res.data);
        setDisplay(res.data);
        
    }


    useEffect(() => {
        // setSearch(fetchData);
        fetchData();
        console.log(fetchData);
    }, [])


    const { loading } = display;

    if (!loading || !loading.length) {
        return <div className="loader">
            <Loading />
        </div>;
    }

    const filteredData = display.filter(issue => {
        const lowerCaseTitle = issue.title.toLowerCase();
        const lowerCaseUser = issue.user.login.toLowerCase();
        const lowerCaseSearch = search.search.toLowerCase();

        return (
            lowerCaseTitle.includes(lowerCaseSearch) ||
            lowerCaseUser.includes(lowerCaseSearch)
        );

    });

    return (
        <div className='body'>
            <div className='issue'>
                <p className="box">
                    Filters
                </p>
                <input
                    type='text'
                    className='box-input'
                    placeholder='is:issue is:open author:naziyathedev  '
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />

                <p className='box' >Labels </p>
                <p className="box" style={{ paddingRight: '6.5rem' }} >Milestones </p>
                <button className="box-button" >New Issue</button>
            </div>

            <div className="issues-table">
                <div className="issue-table-head">
                    <div className="issue-table-head-left">
                        <p className="issue-label" style={{ fontWeight: '600', color: '#c9d1d9', marginRight: '2rem' }} >1,195 Open</p> {" "}
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check">
                            <path fill="#8b949e" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                        </svg>
                        <p className="issue-label" style={{ marginLeft: "0px" }}>6,326 Closed</p>
                    </div>


                    <div className="issue-table-head-right">
                        <p className="issue-label" >Author </p>
                        <p className="issue-label" >Label</p>
                        <p className="issue-label" >Milestones</p>
                        <p className="issue-label" >New Issues</p>

                    </div>
                </div>
            </div>

        <div>

{
        filteredData.map(issue => (
            <IssueRow key={`${issue.id} _issue_row`} issue={issue} />
        ))
    }
</div >
        </div >
    )
}

export default Body