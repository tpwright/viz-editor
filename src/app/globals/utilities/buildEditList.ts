import { IEditListClass }   from '../../interfaces/i-edit-list-class';
import { IEditListItem }    from '../../interfaces/i-edit-list-item';

/*
 *  Create a list of properties of object 'obj' for use by
 *  the ObjectPropertyEditorComponent.
 */
export function buildEditList(obj :IEditListClass) :IEditListItem[]
{
    console.log(`buildEditList(): Begins`);
    if (obj)
    {
        let dpExists = (obj.displayableProperties != null && obj.displayableProperties != undefined);
        console.log(`buildEditList(): obj exists and obj.displayableProperties exists = ${dpExists}`);
    }
    else
    {
        console.log(`buildEditList(): obj DOES NOT exist!`);
    }

    let editList :IEditListItem[] = [];

    // Process each entry in the list of displayable properties
    obj.displayableProperties.forEach(dp =>
        { 
            if(obj[dp.name])
            {
                editList.push({ name         :dp.name,
                                value        :obj[dp.name],
                                isEditable   :dp.isEditable });
            }
        });
        
    console.log(`buildEditList(): Ends; editList.length = ${editList.length}`);
    return editList;
}
  