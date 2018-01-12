import { IEditListClass }   from '../../interfaces/i-edit-list-class';
import { IEditListItem }    from '../../interfaces/i-edit-list-item';

/*
 *  Create a list of properties of object 'obj' for use by
 *  the ObjectPropertyEditorComponent.
 */
export function buildEditList(obj :IEditListClass) :IEditListItem[]
{
    let editList :IEditListItem[] = [];

    // Process each entry in the list of displayable properties
    let lpList = obj.getDisplayableProperties();
    lpList.forEach(function(dp) { if(obj[dp.name])
                                    {
                                    editList.push({name         :dp.name,
                                                value        :obj[dp.name],
                                                isEditable   :dp.isEditable});
                                    }
                                });
    return editList;
}
  