const data = {
  content: `
    <p>
      Op deze pagina staat een overzicht van alle opmaak elementen die je kan gebruiken op een tekstpagina. 
      Alle tekst in de pagina kan <a href="#">tekstlinkjes</a>, <i>italic tekst</i> en <b>bold tekst</b> bevatten. Een tekst kan ook <small>klein</small> zijn. 
      Daarnaast zijn er nog veel meer opmaak elementen, die verderop op deze pagina zijn te vinden. 
    </p>
    <!-- <video src="https://youtu.be/HlqJqh1qE0A" title="A description of the video."></video> -->
    <p>En nog meer inhoud</p>
    <h2>Afbeeldingen <code>(H2)</code></h2>
    <h3>Afbeeldingen <code>(H3)</code></h3>
    <h4>Afbeeldingen <code>(H4)</code></h4>
    <h5>Afbeeldingen <code>(H5)</code></h5>
    
    <p><a href="/" class="btn">Button</a></p>
    <p><a href="/" class="btn--icon">Button tekst (RTE)</a></p>
    <p><a href="/" class="btn--bordered">Button wit</a></p>
    <p><a href="/" class="btn--rounded">Button blauw</a></p>
    <p><a href="/" class="btn--rounded-secondary">Button rood</a></p>
    
    <script>window.hydrationQueue.push({ initComponent: function() { return React.createElement(Components.ContentSection, {
      "content": "\r\nDit is wat tekst\u0026nbsp;\u003cbr /\u003e\r\nen bullet points komt dit escaped terug?\u0026nbsp;\r\n\u003col\u003e\r\n\t\u003cli\u003eeen\u003c/li\u003e\r\n\t\u003cli\u003etwee\u003c/li\u003e\r\n\t\u003cli\u003edrie\u003c/li\u003e\r\n\u003c/ol\u003e\r\n\u0026nbsp;\r\n\r\n\u003cvideo src=\u0027https://www.youtube.com/embed/qI-Do8ateMo\u0027\u003e\u0026nbsp;\u003c/video\u003e\r\n"
    }); }, selector: "#react_0HM4TPS5FFV2S" });</script>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos reprehenderit eligendi minima tempora, aliquam illo nemo nostrum inventore dolor voluptatum.
      <img src="http://via.placeholder.com/920x360" alt="Demo afbeelding" class="image image--responsive"> 
    </p>
    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi molestiae aperiam deserunt enim dolorem corrupti minus, sapiente numquam vel nisi! </p>
    <p> Naast de paginatitels zijn er ook verschillende niveau’s met tussenkopjes. Het begint met H2 daarnaast is het mogelijk om een H3 toe toevoegen (zie hieronder). </p>
    <p><a href="#" class="btn--icon">Link uit RTE</a></p>
    <b>Hieronder volgen de verschillende lijstjes:</b> 
    <ul> 
      <li>Een simpel bullet lijstje</li>
      <li> Met meerdere items
        <ul> 
          <li>En sub bullets met <a href="#">tekstlinkjes</a></li>
        </ul> 
      </li>
      <li> Het bullet lijstje kan over meerdere regels vallen, daar is dit een goed consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </li>
      <li> Met meerdere items 
        <ul> 
          <li>En subitems</li>
          <li> En subitems 
            <ul> 
              <li>En subitems</li>
              <li>En subitems</li>
            </ul> 
          </li>
        </ul>
      </li>
    </ul> 
    <b>Dit kan natuurlijk ook met nummers:</b>
    <ol> 
      <li>Een voorbeeld van een numbered list</li>
      <li> Met meerdere items 
        <ol> 
          <li>En subitems</li>
          <li> En subitems 
            <ol> 
              <li>En subitems</li>
              <li>En subitems</li>
            </ol> 
          </li>
        </ol> 
      </li>
      <li> En ook in dit lijstje kunnen items over verschillende regels vallen, waarbij je moet opletten dat het er niet veel worden.</li>
    </ol>
      `
};

export default data;