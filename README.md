# ts-hypixel
A Hypixel API wrapper made in Typescript

## How to Use
To get started you need to type
```bash
npm install ts-hypixel
```

After you install ts-hypixel, you need to make an **index.ts** file and put the following code within that file.
```typescript
import { Hypixel } from 'ts-hypixel'
const hypixel = new Hypixel('YOUR API KEY')
```
---
## Current Features
```typescript
(async () => {
    // Gets Player Data from a username
    await hypixel.getPlayer("Epicster") // --> (Player Data within Object)
    
    // Gets Guild Data from Guild name
    await hypixel.getGuild("Flexing Chimps") // --> (Guild Data within Object)
    
    // Gets the UUID from the username provided
    await hypixel.usernameToUUID("Epicster") // --> "35482c7a-df59-435e-b079-d2a955ebaa28"
    
    // Gets the username from the UUID provided
    await hypixel.uuidToUsername("35482c7a-df59-435e-b079-d2a955ebaa28") // --> "Epicster"
})();
```
---
## Current Upcoming Features
```typescript
await hypixel.getPlayer()
// Both UUID & Username Support

await hypixel.getFriendsOf()
// Get the friends of a player (UUID & Username Support)
```

### If you wish to suggest any additional features for this package, head over to the GitHub Issues page and submit your idea.