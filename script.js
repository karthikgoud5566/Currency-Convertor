const BASE_URL="https://api.frankfurter.app/latest?";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const mesg=document.querySelector(".msg");

window.addEventListener("load",()=>
{
    updatexchng();
})



for (let select of dropdowns)
{
    for(crncode in countryList )
    {
        let newoptn=document.createElement("option");
        newoptn.innerText=crncode;
        newoptn.value=crncode;
        if(select.name==="from"  && crncode==="USD")
            {
                newoptn.selected="selected";
            }
            else if(select.name==="to" && crncode==="INR")
            {
                newoptn.selected="selected";
            }
        select.append(newoptn);

    }
    select.addEventListener("change",(evt)=>
    {
        updateFlag(evt.target);

    })
}

const updatexchng= async ()=>
    {
            let amount =document.querySelector(".amount input");
            let amntval=amount.value;
            if(amntval==="" || amntval<1)
            {
                amntval=1;
                amount.value="1";
            }
            const URL=`${BASE_URL}from=${fromcurr.value}&to=${tocurr.value}`;
            let response= await fetch(URL);
            let data= await response.json();
            let rate=data.rates[tocurr.value];
            let finalamnt= amntval * rate;
            mesg.innerText=`${amntval} ${fromcurr.value} = ${finalamnt} ${tocurr.value}`;
    }

const updateFlag=(element)=>
{
     let crncode=element.value;
     let countrycode=countryList[crncode];
     let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
     let img=element.parentElement.querySelector("img");
     img.src=newsrc;
};

btn.addEventListener("click",  (evt)=>
{
    evt.preventDefault();
    updatexchng();

})

window.addEventListener("load",()=>
    {
        updatexchng();
    })
    


