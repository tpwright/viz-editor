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
        console.log(`buildEditList(): obj = '${JSON.stringify(obj)}'`);

        let editList :IEditListItem[] = [];

        // Process each entry in the list of displayable properties
        obj.getDisplayableProperties().forEach(dp =>
            { 
                if(obj[dp.name])
                {
                    editList.push({ name         :dp.name,
                                    value        :obj[dp.name],
                                    isEditable   :dp.isEditable });
                }
            });

        console.log(`buildEditList(): Ends; editList = ${JSON.stringify(editList)}`);
        return editList;
    }
    else
    {
        console.log(`buildEditList(): Ends; 'obj' DOES NOT exist!`);
        return null;
    }
}
  