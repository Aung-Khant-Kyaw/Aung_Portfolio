'use strict';

function readTextFile(file)
{
    let rawFile = new XMLHttpRequest();
    let allText = '';
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function merge_elements( element_list )
{
    return React.createElement(React.Fragment, null, ...element_list);
}

class ListingInfo extends React.Component {
    render() {
        let element_list = [];

        let listing_hash = document.location.hash.substr(1, document.location.hash.length);
        let listing_info = JSON.parse(readTextFile("/resources/data/sample_listings/"+listing_hash+"/info.json"));
        let listing_desc_md = readTextFile("/resources/data/sample_listings/"+listing_hash+"/role_desc.md");
        let converter = new showdown.Converter();
        let listing_desc_html = converter.makeHtml(listing_desc_md);

        element_list.push(
            <div className="col span-1-of-2">
                <div className="role_header">
                    <h1 className="company_title">{listing_info.company}</h1>
                </div>
            </div>
        );

        element_list.push(
            <div className="col span-1-of-2">
                <div className="role_markdown">
                    <h1 className="markdown_header"> {listing_info.role} </h1>
                    <div className="role_md" dangerouslySetInnerHTML={{__html:listing_desc_html}}/>
                </div>
            </div>
        );
        
        return element_list;
    }
}

const domContainer = document.querySelector('#listing_info_react_root');
ReactDOM.render(React.createElement(ListingInfo), domContainer);
