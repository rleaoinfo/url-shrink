export function dataCreate(hash_link_form:string , number_acess_form:Number, ip_form:string , geo_form:string) {
    const dataform = {
      hash_link: hash_link_form,
      number_acess: number_acess_form,
      ip: ip_form,
      geo: geo_form
    }
  return dataform;
  }