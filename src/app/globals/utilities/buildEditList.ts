/*
 *  Create a list of propertiesof object 'obj' for use by the
 *  ObjectPropertyEditorComponent. The provided 'disp' is an
 *  array containing an entry for each property that may be
 *  displayed, consisting of the property 'name' and the flag
 *  'isEditable' indicating whether the editor should allow
 *  the property to be edited.
 *
 *  The return value is an array containing and entry for each
 *  of the 'obj' properties that may be displayed, consisting
 *  of the property name, the current 'value' of that property,
 *  and whether the property 'isEditable'
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
        
        // Let's get the names of the object's properties
        let propNames = Object.getOwnPropertyNames(obj);

        // Examine each of obj's properties
        for (let [key, value] of Object.entries(obj))
        {
            // See if this property's name is in the list of displayable properties
            for (let [name, dvals] of Object(disp))
            {
                if (name == propNames[key])         // This property is a displayable
                {
                    list.push({ name: key, value: value, isEditable: dvals.isEditable})
                }
                break;
            }
        }
        return list;
    }
}
  