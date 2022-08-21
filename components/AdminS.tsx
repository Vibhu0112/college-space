import React from 'react';

function AdminS() {
  return (
      
    <div className="mt-4 ml-11">
    <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Admin List</h3>
        <button className="text-gray-600 font-semibold">See All</button>
    </div>
    {
        AdminS.map(admin => (
            <div key={admin.id} className="flex items-center justify-between mt-3">
              <img className="h-10 w-10 rounded-full border p-[2px]" 
              src={admin.data().profileImg} alt="" />

              <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-sm" >{admin.data().username}</h2>
                  <h3 className="text-xs text-gray-400 ">{admin.data().duty}</h3>
              </div>
              <button className="text-blue-600 text-xs font-bold">View</button>
            </div>
            
        ))
    }
</div>
  );
}

export default AdminS;
