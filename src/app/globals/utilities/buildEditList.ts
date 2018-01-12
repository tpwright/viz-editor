/*
 *  Create a list of properties of object 'obj' for use by
 *  the ObjectPropertyEditorComponent. The provided 'disp'
 *  is an array containing an entry for each property that
 *  may be displayed, consisting of the property 'name' and
 *  the flag 'isEditable' which indicates to the editor if
 *  the property may be edited or only displayed.
 *
 *  The return value is an array containing an entry for each
 *  of the 'obj' properties that may be displayed, consisting
 *  of the property name, the current 'value' of that property,
 *  and 'isEditable', indicating whether the property may be
 *  edited.
 */
export function buildEditList(obj  :object,
                              disp :{ name :string,
                                      isEditable :boolean
                                    }[]
                             ) :{ name :string,
                                  value :string|number|boolean,
                                  isEditable :boolean
                                }[]
{
    if (obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]')
    {
        let list :{ name :string,
                    value :string|number|boolean,
                    isEditable :boolean
                  }[] = [];

        // Process each entry in the list of displayable properties
        disp.forEach(function(dp)
                        {            
                            if(obj[dp.name])
                            {
                                list.push({name         :dp.name,
                                           value        :obj[dp.name],
                                           isEditable   :dp.isEditable});
                            }
                        });
    return list;
    }
}
  