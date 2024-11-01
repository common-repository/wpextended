// hidden
window.addEventListener( 'DOMContentLoaded', () => {
  if( !wpExtUserSectionsHidden ) {
    // not needed
    return;
  }


  const H2s = document.querySelectorAll('#profile-page form h2');

  const translationsTag = document.querySelector('#wpext-user-sections-titles'),
        translationsJSON = translationsTag.innerText,
        translations = JSON.parse( translationsJSON );

  const list = [];

  for( let i = 0; i < H2s.length; i++ ) {
    const h2 = H2s[i],
          label = h2.innerText.trim(),
          original = translations[ label ] || label;
    
    const hide = typeof wpExtUserSectionsHidden !== "undefined" 
                  && typeof wpExtUserSectionsHidden[ original ] !== "undefined" 
                  && !(+wpExtUserSectionsHidden[ original ]);
    
    if( !hide ) {
      // skip
      continue;
    }

    h2.style.display = 'none';

    let el = h2;
    while( (el = el.nextElementSibling) &&  el.tagName != 'H2' && !el.classList.contains('submit') ) {
      el.style.display = 'none';
    }
  }
});

// toggle
window.addEventListener( 'DOMContentLoaded', () => {
  if( !wpExtUserSectionsToggle ) {
    // not active
    return;
  }

  const H2s = document.querySelectorAll('#profile-page form h2');

  const list = [];

  for( let i = 0; i < H2s.length; i++ ) {
    const h2 = H2s[i],
          children = [];
    
    let el = h2;
    while( (el = el.nextElementSibling) &&  el.tagName != 'H2' && !el.classList.contains('submit') ) {
      children.push( el );
    }

    const container = document.createElement('DIV');
      container.classList.add('wpext-user-section--container');

    const title = document.createElement( 'DIV' );
      title.classList.add('wpext-user-section--title');

    const body = document.createElement('DIV');
      body.classList.add('wpext-user-section--body');

    h2.parentNode.insertBefore( container, h2 );
      container.appendChild( title );
      container.appendChild( body );

    title.append( h2.parentNode.removeChild( h2 ) );

    for( let i = 0; i < children.length; i++ ) {
      body.appendChild( children[i].parentNode.removeChild( children[i] ) );
    }

    title.addEventListener( 'click', (e) => {
      const className = 'opened',
            status = body.classList.contains( className );
      
      title.classList.toggle( className, !status );
      body.classList.toggle( className, !status );
    });

    if( h2.style.display == 'none' ) {
      container.style.display = 'none';
    }

  }
});
