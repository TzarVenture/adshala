import Count from "@/components/common/Count";

interface DataType {
   id: number;
   count: number;
   count_text: string;
   text: string;
}[];

const count_data: DataType[] = [
   {
      id: 1,
      count: 500,
      count_text: "+",
      text: "Students Trained",
   },
   {
      id: 2,
      count: 450,
      count_text: "+",
      text: "Jobs Secured",
   },
   {
      id: 3,
      count: 100,
      count_text: "+",
      text: "Industry Partners",
   },
   {
      id: 4,
      count: 50,
      count_text: "+",
      text: "Live Projects",
   },
];

const Counter = () => {
   return (
      <section className="fact__area pt-4 pt-lg-5" style={{ backgroundColor: "#f7f7f9" }}>
         <div className="container">
            <div className="fact__inner-wrap" >
               <div className="row">
                  {count_data.map((item) => (
                     <div key={item.id} className="col-lg-3 col-6">
                        <div className="fact__item">
                           <h2 className="count"><Count number={item.count} />{item.count_text}</h2>
                           <p>{item.text}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Counter
