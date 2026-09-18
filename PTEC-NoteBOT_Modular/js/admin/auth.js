
(function(){
const PTEC_ADMIN_CONFIG={
 url:"https://hjpkulbwdejzmbfowvip.supabase.co",
 key:"sb_publishable_fCFWF5rhxHAe2lcadVc4TQ_DfEt2vXG"
};

window.PTEC_ADMIN = {
 client:null,
 async init(){
   if(!window.supabase) return false;
   this.client=supabase.createClient(PTEC_ADMIN_CONFIG.url,PTEC_ADMIN_CONFIG.key);
   return true;
 },
 async login(email,password){
   await this.init();
   return await this.client.auth.signInWithPassword({email,password});
 },
 async logout(){
   if(this.client) return await this.client.auth.signOut();
 },
 async session(){
   await this.init();
   return await this.client.auth.getSession();
 },
 async addMaterial(table,data){
   if(!this.client) await this.init();
   return await this.client.from(table).insert(data);
 },
 async getMaterials(table){
   if(!this.client) await this.init();
   return await this.client.from(table).select('*').order('created_at',{ascending:false});
 },
 async deleteMaterial(table,id){
   if(!this.client) await this.init();
   return await this.client.from(table).delete().eq('id',id);
 }
};

// Admin mode placeholder - does not alter student UI
if(location.hash==="#admin"){
 document.title="PTEC NoteBOT Admin";
 console.log("Admin mode loaded. Use PTEC_ADMIN API after authentication.");
}
})();
