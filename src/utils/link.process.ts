export function dataCreate(hash_link_form:string , url_target_form:string, uri_form:string , token_reference_form:string) {
    const dataform = {
      hash_link: hash_link_form,
      url_target: url_target_form,
      uri: uri_form,
      token_reference: token_reference_form,
      enabled: true,
    }
  return dataform;
  }