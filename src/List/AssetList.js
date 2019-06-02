import React,{Component} from 'react';
import InfinteScrollReverse from "react-infinite-scroll-reverse";
import Contact from './Asset'
import '../index.css'
import SimpleStorage from "react-simple-storage";
class ContactList extends Component{
  state={
    contacts:[],
    per: 10,
    page:1,
    totalPages: null,
        scrolling: false,
  }
  componentWillMount() {
     this.handleContacts();
     this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll();
   })
    }
    handleScroll = () => {
    const { scrolling, totalPages, page} = this.state
    if (scrolling) return
    if (totalPages <= page) return
    var firstLi = document.querySelector(' li:first-child')
    //console.log(firstLi)
    var firstLiOffset = firstLi.offsetHeight + firstLi.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight
    var TopOffset = 20
    if (pageOffset > firstLiOffset - TopOffset) {
      this.loadMore()
     }
    
    }
  handleContacts= async()=>{
   const{ per, page, contacts}=this.state;
   const apicall= await fetch(`https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`)
   const Response= await apicall.json()
  //console.log(Response) 
   this.setState({
    contacts: [...contacts,...Response.contacts],
    scrolling: false,
    totalPages:Response.total_pages
    })
   //console.log(this.state.contacts)
  }
  loadMore = () => {
     this.setState(prevState => ({
      page: prevState.page+1,
      scrolling: true,
     }), this.handleContacts)
    }
  render(){
   return(
    <div>
         <SimpleStorage parent={this} />
         <InfinteScrollReverse
            className="contacts contact-container"
            hasMore={true}
            isLoading={true}
            loadMore={this.loadMore}
            loadArea={10}
            //next={this.handleContacts}
          >
         {this.state.contacts.map(contact => (
           <li key={contact.id}>
           <Contact {...contact}/></li>
           ))}
        </InfinteScrollReverse>
    </div>
    );
  }
} 
export default ContactList